import React from "react";

export function Card ({id, photo, title, like, username}) {
    const avatarImg = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQR0XERGc1kj5LeqGrYuvjrYz3k83SvgbU3Rw&s", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb5gAwN9hYWdmJaV5B2BUhS8_ZH10ZkVczkw&s",
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDCmerCusY656zDu7cgwnuoVE4lncfBqlNnw&s", 
         "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC1zhOYudcs15rET59nIOXGtE6eC8oH_qtsg&s"
        ]
    const videoImg = [
        "https://s3-alpha-sig.figma.com/img/c54f/9c7d/eb94ed33a78d45aae730119ac310cf7b?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=aheiwm7L6N2yMn-teHq3DOdHDwrmD5HVTMB66xT5YWRz0qLBTiYOt~bJej0ylDBcBl8wrXqpmipcglkZfPFv8xys~gY3wjMZBsTykUmZZLg6ALs9HrKg3Bc5M9hEPGLA-8fU2Cp7CEBusW0wlHSnRFKP8W1Ja25EtBC2kNPTdJKgz3dAtAYOwgruKNYeNVAkI8kqz58cEth0CYA8EuV-Wxsm0zHcc25j1ZH6imllfYl3yZKYpF2DAA6PQYd1wxNZ3UwjhFYsxHcFL36mGfkXTHIWGNzDGpCSx-fv-QasV2MYVZZ5oectwsMjWbzPe7zpr28l50tP3Ywt-vfsuMj70w__",
         "https://s3-alpha-sig.figma.com/img/dff8/ac3f/9a6f5a5f4ba5c29ee2fe06ea99ed00da?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=E8-FwXt5TpKqdPuzX9BSMRV2YzxpShxa3pxKouV1UPHv87b5xqhM-ZCLaw1nzLn8~KjhOG6XlmfqBnVtxGsf6NKQ0uL0gEYpFYp2E1TNJpO8NQl6FmN7-NEgfXjrawhp4~Zfn5XelohC75WWtvcGBovhDhs-hN8u0p-BqLE~-GCvGWANQDPS0hZnsPO5~le3rtLAFKmxgrh7ArKtXPnv1UOBeyjUbaayaNg9wdHHfPbih0X298zmW40sEsEtaQyUzSzycshWquJSjgXVCIpFew56Araz3uUIUDHrqKoL1EmoLV21Gtc0Qc1Gov7Gpo~ysZ3XVZXJWIq~LyLxDQJlpA__",
          "https://s3-alpha-sig.figma.com/img/73be/3d65/382f576c4d398ec94dbc4c5897e479b5?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T8iSaEJb5dnmfydyjLvgQn9ql34sOY9sGHfm2kukPGIcJ3suHRxf3wztIKVI60eZm2yh3QVFYpVk8kvFZ-APVKFMT2iFSZRpYm-6DxfLsyFaDm3H9nnCl2zldXAeCWIMNEcnEWMrHuNHeVCw1lTb-Qg2XPKGzsr3ceVNjYtp2Tzs2vwHWpUqWMt0y-N~CdNcGq7pTRsmzSzWCysq9L3QX1uKjDWMXMzKV-zanxhKLLi4z~QrlEiybiIxMCVZYYGkw0-YE2~yN-3~sBXBVXffYySP7u~LAbyYiNVxmu9Cb5bO0RwQm9VTU5KMtjGwIR5zOBfVziJXdVIQ2L8biBxQyQ__"

    ]

    return (
            <div className="content-master-large-1-tag items-center">

                {/* video and serial */}
                <div className='qt'>              
                    
                    <span className="number container-1">
                        {id}
                    </span>
                    
                    <div className="image-container">
                        <img 
                            src={photo} 
                            alt='scs' 
                            onError={({target}) => {
                                target.onError = null;
                                target.src = videoImg[ Math.floor(Math.random() * videoImg.length) ]
                            }}
                        />
                    </div>

                    <p className="title">
                        {title}
                    </p>
                
                </div>

                {/* avatar */}
                <div className='avt ht ml '>
                    <div className="avatar items-center">
                        <div className="avatar-style-xsmall-with-image">
                            <div className="avatar-1">
                                <img className="img" src={avatarImg[Math.floor(Math.random() * avatarImg.length)]} alt='user' />
                            </div>
                        </div>
                        <div className="sjkj-3987423-kjbdfsf">
                            {username}
                        </div>
                    </div>
                    <div className="likes">
                        <span className="container">
                            {like}
                        </span>
                        <div className="media-icons">
                            <svg
                                fill="currentColor"
                                version="1.1"
                                id="Capa_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 976.051 976.05"
                                xmlSpace="preserve"
                                >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                    <path d="M572.875,51.326L572.875,51.326c-12.8-12.8-28.6-22.6-45.6-28.5c-4.9-1.7-10-3.1-15.101-4.2c-22.5-4.8-46.6-2.6-68,5.8 c-15.3,6-29.3,15.2-41,26.9l0,0l-368,368c-46.899,46.899-46.899,122.8,0,169.699c46.9,46.9,122.801,46.9,169.7,0l163.1-163.1v414 c0,66.3,53.7,120,120,120c66.301,0,120-53.7,120-120v-414l163.101,163.1c23.399,23.4,54.1,35.101,84.899,35.101 c30.801,0,61.4-11.7,84.9-35.101c46.9-46.899,46.9-122.8,0-169.699L572.875,51.326z"></path>
                                    </g>
                                </g>
                            </svg>
                        </div>
                    </div>  
                </div>

            </div>

    )
}