import Image from "next/image"


const AvatarGroup = ({ avatars, maxVisible }:{
    avatars:string[],
    maxVisible:number
}) => {
    // console.log('Avatars:',avatars);
        return (
            <div className="flex items-center gap-2">
               {
                   avatars.slice(0,maxVisible).map((avatar:string,index:number)=>(
            
                       <Image
                       key={index}
                       src={"/avatar.png"}
                       alt="avatar"
                       width={50}
                       height={50}
                       className="w-9 h-9  rounded-full border-2 border-white -ml-3 first:ml-0"
                       />
           
                   ))
                   
               }
               {
               avatars.length > maxVisible && (
               <div className="w-9 h-9 flex items-center justify-center rounded-full border-2 border-white -ml-3 text-xs text-white bg-black/50 cursor-pointer">
                +{avatars.length - maxVisible}
               </div>
               )}
            </div>
        )
    }

export default AvatarGroup