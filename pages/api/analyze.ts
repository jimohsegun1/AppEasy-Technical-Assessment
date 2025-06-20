import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const tryAnalyze = async (apiKey: string, description: string): Promise<string | null> => {
  const openai = new OpenAI({ apiKey });

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        {
          role: 'user',
          content: `Summarize and extract 3 resume skills from this job description:\n\n${description}`,
        },
      ],
    });

    return completion.choices[0]?.message.content ?? null;
  } catch (error: any) {
    console.warn(`❌ Failed with key ${apiKey.slice(0, 8)}...: ${error?.message}`);
    return null;
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { description } = req.body;

  const keys = [
    process.env.OPENAI_API_KEY_PRIMARY,
    process.env.OPENAI_API_KEY_SECONDARY,
  ].filter(Boolean);

  let result: string | null = null;
  for (const key of keys) {
    result = await tryAnalyze(key!, description);
    if (result) break;
  }

  const mocked = result === null;

  if (!result) {
    result = `**Summary:** A dynamic role requiring a problem-solving mindset and clear communication.\n\n**Top 3 Skills:**\n- Communication\n- JavaScript\n- Problem Solving`;
  }

  res.status(200).json({ result, mocked });
}
