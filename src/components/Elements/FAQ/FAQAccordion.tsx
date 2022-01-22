import Image from 'next/image';
import Link from "next/link";
import { FAQAccordionItem } from "./FAQAccordionItem";

export const FAQAccordion = () => {

    return (
        <div className="accordion-container p-0 rounded accordion accordion-flush">
            <FAQAccordionItem 
                headerId="faq-header-1"
                bodyId="faq-body-1"
                question="Which wallet can I use?"
                textElement={<span>ADA Blobs supports the <a href="https://namiwallet.io/" className='link' target="_blank" rel="noopener noreferrer">Nami Wallet</a> as it is currently the only Cardano wallet that supports smart contract functionality. Additional wallets will be added as they obtain smart contract functionality.</span>}
                imageElement={<Image src="/images/blobs/001-Bob.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={true}
            />
            <FAQAccordionItem 
                headerId="faq-header-2"
                bodyId="faq-body-2"
                question="Does ADA Blobs use smart contracts?"
                textElement={<div>
                                <span><strong>YES!</strong> ADA Blobs is fully based on an auction smart contract. ADA Blobs is also the first project on the Cardano Blockchain to use an auction smart contract.</span>
                                <br />
                                <br />
                                <span>The contract address: <strong>addr1w8qupuhmh3qwckr7dglaqkjr7qhruglem6anp49x9ey70wcrn3fa8</strong></span>
                                <br />
                                <br />
                                <span>Here is the full ADA Blobs website <a href="https://github.com/NicholasMaselli/ADABlobs/" className='link' target="_blank" rel="noopener noreferrer">source code</a>.</span>
                                <br />
                                <span>Here is the full ADA Blobs smart contract <a href="https://github.com/NicholasMaselli/ADABlobsPlutus/" className='link' target="_blank" rel="noopener noreferrer">source code</a>.</span>
                             </div>}
                imageElement={<Image src="/images/blobs/010-Peep-Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Peep"} />}
                contentLeft={false}
            />
            <FAQAccordionItem 
                headerId="faq-header-3"
                bodyId="faq-body-3"
                question="How do Cardano NFTs work?"
                textElement={<div>
                                <span>Each ADA Blob is a unique token on the Cardano Blockchain and can never change. The minting policy is based on time and locked on December 27th, 2021 UTC.</span>
                                <br />
                                <br />
                                <span>The ADA Blobs minting script: </span>
                                <br />
                                <span><strong>{`{"type": "all", "scripts": [{"type": "before", "slot": 49000000}, {"type": "sig", "keyHash": "a5f81a840fe65b95685fdb9af8c95ac2f8bad54de16efe804edafbf6"}]}`}</strong></span>
                                <br />
                                <br />
                                <span>Hasing the above script will give you the ADA Blobs Policy ID: <strong>4a4c17cc89b90f7239ce83f41e4f47005859870178f4e6815b1cd318</strong></span>
                             </div>}
                imageElement={<Image src="/images/blobs/009-Blurp.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"} />}
                contentLeft={true}
            />
            <FAQAccordionItem 
                headerId="faq-header-4"
                bodyId="faq-body-4"
                question="How rare are certain Blobs?"
                textElement={<span>Each Blob&apos;s rarity is based solely on their color. You can view all the Blob color rarities <Link href="/rarity"><a className='link'>here</a></Link>.</span>}
                imageElement={<Image src="/images/blobs/008-Glob-Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={false}
            />
            <FAQAccordionItem 
                headerId="faq-header-5"
                bodyId="faq-body-5"
                question="Why should I buy an ADA Blob?"
                textElement={
                    <div>
                        <span>ADA Blobs are the cutest and most adorable NFTs on the Cardano Blockchain. Why would someone not want a pet Blob!</span>
                        <br />
                        <br />
                        <span>ADA Blobs is also the community NFT for the Avatar Nick Youtube Channel and Discord Server.</span>
                    </div>}
                imageElement={<Image src="/images/blobs/007-Yolg.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={true}
            />
            <FAQAccordionItem 
                headerId="faq-header-6"
                bodyId="faq-body-6"
                question="How can I purchase a Blob?"
                textElement={<span>On the ADA Blobs website, Blobs are auctioned and can be bid on using the ADA <strong>(₳)</strong> cryptocurrency which is the Cardano Blockchain&apos;s native currency. You can purchase a Blob by following the <Link href="/guide"><a className='link'>guide</a></Link>!</span>}
                imageElement={<Image src="/images/blobs/006-Oobby-Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={false}
            />
            <FAQAccordionItem 
                headerId="faq-header-7"
                bodyId="faq-body-7"
                question="Is my bid locked in the contract?"
                textElement={<span>Yes. Placing a bid will lock those funds in the contract until either someone else outbids or the auction closes. To keep the auction fair, cancelling a bid after it is made is not supported.</span>}
                imageElement={<Image src="/images/blobs/005-Rooboo.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={true}
            />
            <FAQAccordionItem 
                headerId="faq-header-8"
                bodyId="faq-body-8"
                question="What fees are involved with purchasing or auctioning an ADA Blob?"
                textElement={<span>Along with the Cardano Blockchain validator fees, the ADA Blobs marketplace charges a 1% service fee for auctioning a Blob.</span>}
                
                imageElement={<Image src="/images/blobs/004-Broogr-Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={false}
            />
            <FAQAccordionItem 
                headerId="faq-header-9"
                bodyId="faq-body-9"
                question="I purchased a Blob and want to auction it, can I do that on ADA Blobs?"
                textElement={<span>Yes. Blob owners can auction their Blob on this website which will use the same smart contract as the original auction. Blob owners can also sell their Blob on another NFT marketplace if they choose.</span>}
                imageElement={<Image src="/images/blobs/003-Bluub.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={true}
            />
            <FAQAccordionItem 
                headerId="faq-header-10"
                bodyId="faq-body-10"
                question="I want to set a minimum price for an ADA Blob that I'd like to auction off. Can I do that?"
                textElement={<span>Yes. Simply set the &quot;Reserve Price&quot; in the auction section to whatever you want the minimum acceptable bid to be.</span>}
                
                imageElement={<Image src="/images/blobs/002-Wumb-Reverse.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={false}
            />
            <FAQAccordionItem 
                headerId="faq-header-11"
                bodyId="faq-body-11"
                question="Help! I am getting transaction errors, what should I do?"
                textElement={<div>
                                <span>Ensure your wallet has the proper collateral, your bid is high enough, and the auction has not ended. Additionally try refreshing the page and submitting a new transaction.</span>
                                <br />
                                <br />
                                <span>If the problem persists, please reach out to our Discord Server.</span>
                             </div>}
                imageElement={<Image src="/images/blobs/001-Bob.png" quality={100} width={"200%"} height={"200%"} alt={"Bob"}  />}
                contentLeft={true}
            />
            <style jsx>{`
                .accordion-container {
                    border-width: 5px;
                    border-style: solid;
                    border-color: #bbc9ec; 
                }                

                .link {
                    text-decoration: none;
                    font-weight: 700;
                }             
            `}</style>  
        </div>
    )
}