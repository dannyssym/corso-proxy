export default async function handler(req, res) {
  const path = req.query.path || '';
  const targetUrl = `https://corsomovement.brandbot-checkout.com/${path}`;
  
  const response = await fetch(targetUrl);
  const contentType = response.headers.get('content-type') || '';
  
  let body = await response.text();
  
  // Rewrite all absolute URLs to go through proxy
  body = body.replace(
    /https:\/\/corsomovement\.brandbot-checkout\.com/g,
    'https://corso-proxy.vercel.app/checkout'
  );
  body = body.replace(
    /https:\/\/corsomovement\.marianaiframes\.com/g,
    'https://corso-proxy.vercel.app/marianaiframes'
  );
  body = body.replace(
    /https:\/\/assets\.brandbot\.com/g,
    'https://corso-proxy.vercel.app/brandbot-assets'
  );

  res.setHeader('Content-Type', contentType);
  res.setHeader('X-Frame-Options', 'ALLOWALL');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.send(body);
}
