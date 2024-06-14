import axios from 'axios';
import cheerio from 'cheerio';
import EasyYandexS3 from 'easy-yandex-s3';

interface Event {
  title: string;
  url: string;
}

const s3 = new EasyYandexS3({
  auth: {
    accessKeyId: process.env.ACCESS_KEY as string,
    secretAccessKey: process.env.SECRET_KEY as string,
  },
  Bucket: 'parse-4',
  debug: true,
});

async function handler(event): Promise<{ statusCode: number; body: string }> {
  try {
    const response = await axios.get('https://sxodim.com/almaty');
    const html: string = response.data;
    const $ = cheerio.load(html);

    const data: Event[] = [];
    $('.impression-card-title').each((index, element) => {
      data.push({
        title: $(element).text().trim(),
        url: $(element).attr('href') || ''
      });
    });

    const result = {
      lastUpdated: new Date().toISOString(),
      events: data
    };

    const upload = await s3.Upload({
      name: 'data.txt',
      buffer: Buffer.from(JSON.stringify(result)),
    },
    '/'
    );

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };

  } catch (error) {
    console.error('Error parsing data:', error);
    return {
      statusCode: 500,
      body: 'Failed to parse data'
    };
  }
}

export { handler };
