import { NextApiRequest, NextApiResponse } from "next";

import { getBookDetails } from "../../../hooks/books";

const handler = async (request : NextApiRequest, response: NextApiResponse) => {
    const id: string= request.query.bookId as string;
    const data = await getBookDetails({id})
    response.status(200).json(data.book)
}

export default handler;