const Axios = require('axios');
const cheerio = require('cheerio');

const pesquisar = (produto) => {
    Axios.get("https://www.amazon.com.br/s?k=" + produto).then(objResult => {
        const html = cheerio.load(objResult.data);
        const itemDiv = html('.s-result-list.s-search-results.sg-row').find('.s-result-item').toArray();
        for (i = 0; i < itemDiv.length; i++) {
            item = html(itemDiv[i]);
            const title = item.find('.a-size-base-plus.a-color-base.a-text-normal').text().trim();
            const price = item.find('.a-price-whole').text().trim() + item.find('.a-price-fraction').text().trim();
            if (title !== "" && price !== "" && price !== "0,00") {
                title.replace("_", "");
                price.replace("_", "");
                let string = title + "_" + price;
                console.log(string);
            }
        }
        console.log("Done!")
    });
}
pesquisar(process.argv[2]);