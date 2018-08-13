const puppeteer = require('puppeteer');
let cheerio = require('cheerio');


let scrape = async () => {
  const browser = await puppeteer.launch({
    // headless: false
  });
  const page = await browser.newPage();

  await page.goto('http://books.toscrape.com/');

  let NEXT_BTN;
  NEXT_BTN = true;
  //   if (await page.$('#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a') == null) {
  //     NEXT_BTN = false;
  //   } else {

  //   }
  let id = 1;
  let where = 1;
  let while_count = 1;
  let all_data = [];
  //   const [cerr, content] = await page.content()
  //   console.log('1234567876----------------', page.content());
  //   $ = cheerio.load(content);
  //   let num = $('.row > li').length;
  //   console.log('==============', num);
  while (NEXT_BTN) {
    console.log('=>>>>>>>>>>>>>>>>> in while');
    const result = await page.evaluate(({
      all_data,
      id,
      where
    }) => {
      let data = []; // 初始化空数组来存储数据
      let elements = document.querySelectorAll('.product_pod'); // 获取所有书籍元素

      for (let element of elements) { // 循环
        let title = element.getElementsByTagName('A')[1].getAttribute("title"); // 获取标题
        let price = element.childNodes[7].children[0].innerText; // 获取价格
        data.push({
          where,
          id,
          title,
          price
        }); // 存入数组
        id++;
      }
      return data; // 返回数据
    }, {
      all_data,
      id,
      where
    });
    // data.push(result);
    let bodyHTML = await page.evaluate(() => document.body.innerHTML);
    $ = cheerio.load(bodyHTML);
    let num = $('.row > li').length;
    id += num;
    console.log('page', where, ' => done!!!!');
    where++;
    if (result) {
      all_data.push(result);
    }
    console.log('=>>>>>>>>>>>>>>>> end while');

    // await page.waitFor(3000);
    if (await page.$('#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a') == null) {
      NEXT_BTN = false;
    } else {
      NEXT_BTN = true;
      await page.click('#default > div > div > div > div > section > div:nth-child(2) > div > ul > li.next > a');
    }
    await page.waitFor(3000);
  }

  console.log('-------------------------------------------------------------');
  console.log(all_data);



  //   console.log(data);
  browser.close();
  //   return allpage;
};
scrape().then((value) => {
  //   console.log('---', value); // Success!
});
