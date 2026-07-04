"use client";

import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import type { UserDashboardProfile } from "../_lib/dashboard.data";
import {
  createSellerListing,
  deleteSellerListing,
  getSellerConversations,
  markSellerConversationRead,
  readSellerListings,
  sendSellerConversationMessage,
  subscribeSellerMarketplace,
  updateSellerListingStatus,
  type SellerConversation,
  type SellerListing,
  type SellerListingStatus,
} from "@/components/marketplace/seller-marketplace-store";

export interface ListingFormState {
  title: string;
  productType: string;
  platform: string;
  edition: string;
  activationRegion: string;
  delivery: string;
  stock: string;
  price: string;
  currency: string;
  imageUrl: string;
  description: string;
}

export const productTypeOptions = [
  "Product key",
  "Gift card",
  "Game currency",
  "Game account",
  "Game item",
  "Software license",
  "Power leveling",
];

export const platformOptions = [
  "Steam",
  "Xbox Live",
  "PlayStation Store",
  "Nintendo eShop",
  "Epic Games",
  "Microsoft",
  "Riot Games",
  "Global service",
];

export const deliveryOptions = ["Instant", "Up to 15 min", "Up to 1 hour", "Manual"];
export const regionOptions = ["Global", "Europe", "United States", "Vietnam", "Asia"];

export const imageOptions = [
  { label: "Default game cover", value: "/cyberpunk_2077.jpg" },
  { label: "Valorant cover", value: "/topup-valorant.jpg" },
  { label: "Software cover", value: "/product1.png" },
];

export type WorkspaceTab = "overview" | "products" | "create" | "inbox";

export function createEmptyListingForm(currencySymbol: string): ListingFormState {
  return {
    title: "",
    productType: productTypeOptions[0],
    platform: platformOptions[0],
    edition: "Standard",
    activationRegion: regionOptions[0],
    delivery: deliveryOptions[0],
    stock: "10",
    price: "9.99",
    currency: currencySymbol,
    imageUrl: imageOptions[0].value,
    description: "",
  };
}

export function useSellerWorkspace(profile: UserDashboardProfile) {
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("overview");
  const [listings, setListings] = useState<SellerListing[]>([]);
  const [conversations, setConversations] = useState<SellerConversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [form, setForm] = useState<ListingFormState>(() =>
    createEmptyListingForm(profile.currency.symbol)
  );

  const syncMarketplaceState = async () => {
    try {
      const nextListings = await readSellerListings(profile.id);
      setListings(nextListings);
    } catch (e) {
      console.error("Failed to read seller listings:", e);
    }
    try {
      const nextConversations = await getSellerConversations(profile.id);
      setConversations(nextConversations);
      setActiveConversationId((currentId) => {
        if (
          currentId &&
          nextConversations.some((conversation) => conversation.id === currentId)
        ) {
          return currentId;
        }
        return nextConversations[0]?.id ?? null;
      });
    } catch (e) {
      console.error("Failed to read seller conversations:", e);
    }
  };

  useEffect(() => {
    syncMarketplaceState();
    return subscribeSellerMarketplace(syncMarketplaceState, profile.id);
  }, [profile.id]);

  useEffect(() => {
    const applyHash = () => {
      if (window.location.hash === "#seller-inbox") {
        setActiveTab("inbox");
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => {
      window.removeEventListener("hashchange", applyHash);
    };
  }, []);

  useEffect(() => {
    if (activeTab === "inbox" && activeConversationId) {
      void markSellerConversationRead(activeConversationId, "seller");
    }
  }, [activeConversationId, activeTab]);

  useEffect(() => {
    if (!toastMessage) return;
    const timeoutId = window.setTimeout(() => setToastMessage(null), 2600);
    return () => window.clearTimeout(timeoutId);
  }, [toastMessage]);

  const stats = useMemo(() => {
    const publishedListings = listings.filter((listing) => listing.status === "published");
    const totalSales = listings.reduce((total, listing) => total + listing.sales, 0);
    const grossRevenue = listings.reduce((total, listing) => total + listing.sales * listing.price, 0);
    const unreadMessages = conversations.reduce((total, conversation) => total + conversation.unreadForSeller, 0);

    return {
      publishedListings: publishedListings.length,
      totalSales,
      grossRevenue,
      unreadMessages,
      lowStock: listings.filter((listing) => listing.stock <= 5).length,
    };
  }, [conversations, listings]);

  const activeConversation =
    conversations.find((conversation) => conversation.id === activeConversationId) ?? conversations[0];

  const updateFormField = (field: keyof ListingFormState, value: string) => {
    setForm((currentForm) => ({ ...currentForm, [field]: value }));
  };

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFormError("Please upload an image file.");
      return;
    }

    if (file.size > 2.5 * 1024 * 1024) {
      setFormError("Image must be smaller than 2.5 MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        setFormError("Could not read this image.");
        return;
      }
      updateFormField("imageUrl", reader.result);
      setFormError(null);
      showToast("Image uploaded");
    };

    reader.onerror = () => {
      setFormError("Could not read this image.");
    };
    reader.readAsDataURL(file);
  };

  const handleSaveListing = async (status: SellerListingStatus) => {
    const title = form.title.trim();
    const price = Number(form.price);
    const stock = Number(form.stock);

    if (!title) {
      setFormError("Product name is required.");
      return;
    }

    if (!Number.isFinite(price) || price <= 0) {
      setFormError("Price must be greater than 0.");
      return;
    }

    if (!Number.isInteger(stock) || stock < 0) {
      setFormError("Stock must be a whole number.");
      return;
    }

    try {
      await createSellerListing(
        {
          title,
          productType: form.productType,
          platform: form.platform,
          edition: form.edition.trim() || "Standard",
          activationRegion: form.activationRegion,
          delivery: form.delivery,
          stock,
          price,
          currency: form.currency,
          imageUrl: form.imageUrl,
          description:
            form.description.trim() || "Digital product with protected marketplace checkout.",
          status,
        },
        profile.id
      );

      setForm(createEmptyListingForm(profile.currency.symbol));
      setFormError(null);
      setActiveTab("products");
      showToast(status === "published" ? "Product published" : "Draft saved");
    } catch (err) {
      console.error("Failed to create product:", err);
      setFormError("Failed to save product to the database.");
    }
  };

  const handleChangeStatus = async (listingId: string, status: SellerListingStatus) => {
    try {
      await updateSellerListingStatus(listingId, status, profile.id);
      showToast(`Listing moved to ${status}`);
    } catch (err) {
      console.error("Failed to update status:", err);
      showToast("Failed to update status");
    }
  };

  const handleDeleteListing = async (listingId: string) => {
    try {
      await deleteSellerListing(listingId, profile.id);
      showToast("Listing deleted");
    } catch (err) {
      console.error("Failed to delete listing:", err);
      showToast("Failed to delete listing");
    }
  };

  const handleSelectConversation = async (conversationId: string) => {
    setActiveConversationId(conversationId);
    try {
      await markSellerConversationRead(conversationId, "seller");
    } catch (err) {
      console.error("Failed to mark conversation read:", err);
    }
  };

  const handleSendReply = async () => {
    const text = replyText.trim();
    if (!text || !activeConversation) return;

    try {
      await sendSellerConversationMessage(activeConversation.id, {
        senderRole: "seller",
        senderName: activeConversation.sellerName,
        senderAvatar: activeConversation.sellerAvatar,
        text,
      });
      await markSellerConversationRead(activeConversation.id, "seller");
      setReplyText("");
      showToast("Reply sent");
    } catch (err) {
      console.error("Failed to send reply:", err);
      showToast("Failed to send reply");
    }
  };

  return {
    activeTab,
    setActiveTab,
    listings,
    conversations,
    activeConversation,
    replyText,
    setReplyText,
    formError,
    toastMessage,
    form,
    stats,
    updateFormField,
    handleUploadImage,
    handleSaveListing,
    handleChangeStatus,
    handleDeleteListing,
    handleSelectConversation,
    handleSendReply,
  };
}
