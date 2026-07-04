"use client";

import {
  MdSpaceDashboard,
  MdShoppingBag,
  MdAccountBalanceWallet,
  MdCardGiftcard,
  MdPerson,
  MdBookmark,
  MdVerified,
  MdContactSupport,
  MdBugReport,
  MdStorefront,
} from "react-icons/md";
import { FaTicketAlt, FaHandHoldingUsd } from "react-icons/fa";
import { MenuItem, MenuSection } from "./MenuComponents";

interface UserMenuContentProps {
  t: (key: string) => string;
}

export function UserMenuContent({ t }: UserMenuContentProps) {
  const navigateTo = (href: string) => {
    window.location.href = href;
  };

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto px-5">
      <MenuSection title={t("mainSection")}>
        <MenuItem
          icon={<MdSpaceDashboard />}
          label={t("dashboard")}
          onClick={() => navigateTo("/account/dashboard")}
        />
        <MenuItem
          icon={<MdStorefront />}
          label="Seller dashboard"
          onClick={() => navigateTo("/account/dashboard#seller-workspace")}
        />
        <MenuItem icon={<MdShoppingBag />} label={t("myOrders")} />
      </MenuSection>

      <MenuSection title={t("financesSection")}>
        <MenuItem
          icon={<MdAccountBalanceWallet />}
          label={t("wallet")}
          value="$ 0.00"
          valueBadge
          expandable
        />
        <MenuItem
          icon={<MdCardGiftcard />}
          label={t("cashback")}
          value="€ 0.00"
          valueBadge
          valueClassName="text-[#4ade80]"
        />
        <MenuItem icon={<FaHandHoldingUsd />} label={t("affiliateProgram")} />
      </MenuSection>

      <MenuSection title={t("casesSection")}>
        <MenuItem icon={<FaTicketAlt />} label={t("myTickets")} />
      </MenuSection>

      <MenuSection title={t("generalSection")} noDivider>
        <MenuItem icon={<MdPerson />} label={t("accountSettings")} expandable />
        <MenuItem icon={<MdBookmark />} label={t("bookmarks")} />
        <MenuItem icon={<MdVerified />} label={t("verification")} expandable />
        <MenuItem icon={<MdContactSupport />} label={t("contactUs")} />
        <MenuItem icon={<MdBugReport />} label={t("bugReport")} />
      </MenuSection>
    </div>
  );
}
