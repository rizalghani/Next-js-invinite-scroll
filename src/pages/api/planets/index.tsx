// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Response = {
    message: string;
    data: Data[]
}


type Data = {
    name: string;
    mass: number;
    radius: number;
    period: number;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
    try {
        if (req.method === 'GET') {
            const planets = [
                {
                    name: 'Merkurius',
                    mass: 0.000174,
                    radius: 0.0341,
                    period: 88,
                },
                {
                    name: 'Venus',
                    mass: 0.00257,
                    radius: 0.0847,
                    period: 224.7,
                },
                {
                    name: 'Bumi',
                    mass: 0.00315,
                    radius: 0.0892,
                    period: 365.2,
                },
                {
                    name: 'Mars',
                    mass: 0.000338,
                    radius: 0.0488,
                    period: 687,
                },
                {
                    name: 'Jupiter',
                    mass: 1,
                    radius: 1,
                    period: 4331,
                },
                {
                    name: 'Saturnus',
                    mass: 0.299,
                    radius: 0.843,
                    period: 10747,
                },
                {
                    name: 'Uranus',
                    mass: 0.0457,
                    radius: 0.358,
                    period: 30589,
                },
                {
                    name: 'Neptunus',
                    mass: 0.0537,
                    radius: 0.346,
                    period: 59800,
                },

            ];
            res.status(200).json({ message: "ok", data: planets });
        } else {
            res.status(400)
        }
    } catch (err) {
        res.status(500)
    }

}
