export const connect = async () => 
{
    try {
        if (typeof window === "undefined") return;

        const cardano = window.cardano;
        if (!cardano) 
        {
            console.error("Error: window.cardano is null or undefined. You must have a Cardano Wallet Extension (such as Nami) to connect.")
            return;
        }
    
        const walletConnected = await isConnected();
        if (!walletConnected) return false;
            
        const isEnabled = await cardano.enable();
        return isEnabled;
    }
    catch (error) {
        console.error(error);
        return false;
    }    
}

export const isConnected = async () => 
{
    try {
        if (typeof window === "undefined") return false;

        const cardano = window.cardano;
        if (!cardano) return false;
    
        return await cardano.isEnabled();
    }
    catch (error) {
        console.error(error);
        return false;
    }
    
}