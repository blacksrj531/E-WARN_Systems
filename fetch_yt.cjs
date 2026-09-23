const https = require('https');
const ids = ['N7mWGMsaxHw','omxzkXiMRA0','kvwfaSVDmUE','BQJ-sKtPpsk','uzBKooSX3gY','8IQV2UpzMpc','pAytc6SPZno','-yfX1dECHP8','sSa_D5qOhnA','x3PTSNVPTy4','aIrLiid2RRo','EuET-BLi-B8','kEcgsjs-7DY','8qTDN976FRw','f985QA8uG8k','L4-RKeoZAE8'];

async function fetchTitle(id) {
  return new Promise((resolve) => {
    https.get('https://www.youtube.com/watch?v=' + id, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/<title>(.*?)<\/title>/);
        let title = match ? match[1].replace(' - YouTube', '') : 'Unknown Video';
        resolve({ id, title: title.replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"') });
      });
    }).on('error', () => resolve({ id, title: 'Unknown Video' }));
  });
}

async function run() {
  const results = [];
  for (let id of ids) {
    results.push(await fetchTitle(id));
  }
  console.log(JSON.stringify(results, null, 2));
}
run();
