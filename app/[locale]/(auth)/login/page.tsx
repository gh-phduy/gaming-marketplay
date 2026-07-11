import { Input } from "@/components/ui/input";
import { TfiEmail } from "react-icons/tfi";
import { GoShieldLock } from "react-icons/go";

export default function SignUpPage() {
    return (
        <div className="flex flex-col gap-y-5 items-center">
            <div className='text-[24px] font-semibold text-white'>Log in to your account</div>
            <span className='text-[#9ba1ab] text-[16px]'>Log in to your account and join the world of games together</span>
            
            <div className="w-full" >
                <span className="text-[#F6F6F6] text-[16px]" >EMAIL OR USERNAME</span>
            <div className="mt-2 w-full w-[418px] p-5 h-[55px] bg-[#354051] flex justify-between items-center rounded-md" >
            <TfiEmail size={20} className="text-[#9ba1ab]" />
            <Input
            className=" w-full border-none focus:outline-hidden caret-[#9ba1ab] text-white"
            type="email"
            placeholder="Your Username / E-mail"
             />
            
            </div>
            </div>
            <div className="w-full" >
                <span className="text-[#F6F6F6] text-[16px]" >PASSWORD</span>
            <div className="mt-2 w-full w-[418px] p-5 h-[55px] bg-[#354051] flex justify-between items-center rounded-md" >
            <GoShieldLock size={20} className="text-[#9ba1ab]" />
            <Input
            className=" w-full border-none focus:outline-hidden caret-[#9ba1ab] text-white"
            placeholder="Password"
            type="password"
             />
            
            </div>
            </div>
            
            <div className="bg-[#8a98ad] rounded-lg w-[420px] h-[54px] text-[16px] font-semibold text-white flex justify-center items-center" >LOG IN</div>
        </div>
    )
}