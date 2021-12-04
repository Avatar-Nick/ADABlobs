import { NextApiRequest, NextApiResponse } from "next";
import { useRouter } from 'next/router'
import { blockfrostRequest } from "../../../../src/api/requests";

const handler = (req : NextApiRequest, res : NextApiResponse) =>
{
    const { address } = req.query
    //const { id } = router.query

    //blockfrostRequest
    //console.log(process.env.BLOCKFROST_API_KEY)
    res.status(200).json({ name: 'John Doe' })
}

export default handler;