
// import { useRouter } from 'next/router'
// import React, { useEffect } from 'react'

// export default function Protected({children}:{children:React.ReactNode}) {
//     const router = useRouter()


//     useEffect(()=>{
//         const isLoggedIn = localStorage.getItem('isLoggedIn')
//         if(!isLoggedIn){
//             router.push('/admin')
//         }

//     },[router])
//     return <>
//        {children}
//     </>
// }



"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        router.push("/admin");
      } else {
        setIsLoading(false);
      }
    }
  }, [router]);

  if (isLoading) {
    return <p className="text-center mt-10 text-gray-600">Checking authentication...</p>;
  }

  return <>{children}</>;
}
