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

    let body = await response.text();

    body = body.replace(/https:\/\/corsomovement\.brandbot-checkout\.com/g, 'https://corso-proxy.vercel.app/checkout');
    body = body.replace(/https:\/\/corsomovement\.marianaiframes\.com/g, 'https://corso-proxy.vercel.app/marianaiframes');
    body = body.replace(/https:\/\/assets\.brandbot\.com/g, 'https://corso-proxy.vercel.app/brandbot-assets');

    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(body);

  } catch (err) {
    res.status(500).send(`Proxy error: ${err.message}`);
  }
}
