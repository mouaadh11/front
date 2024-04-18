import { FaTruckLoading } from "react-icons/fa"
import style from "./authLayout.module.css"
export default function AuthLayout({ children }) {
    return (
        <div className="flex h-screen bg-[#74b2eb]">
            <div className="m-auto bg-slate-50 rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className={style.AuthImag} >
                    <div className={style.BgImg}/>
                </div>
                <div className="right flex flex-col justify-evenly ">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}