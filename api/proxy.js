export default async function handler(req, res) {
  const path = req.query.path || '';
  const targetUrl = `https://corsomovement.brandbot-checkout.com/${path}`;
  
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://corsomovement.brandbot-checkout.com/',
        'Origin': 'https://corsomovement.brandbot-checkout.com'
      }
    });

    const debug = {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
      bodyLength: (await response.text()).length
    };

    res.status(200).json(debug);

  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
}
