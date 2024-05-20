import chromium from '@sparticuz/chromium-min'
import { chromium as playwright } from 'playwright-core'

const idToPageMapping = {
  'tt0428167:1:1': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Parkplatz--/867/',
  'tt0428167:1:2': 'https://www.myspass.de/shows/tvshows/stromberg/Feueralarm--/866/',
  'tt0428167:1:3': 'https://www.myspass.de/shows/tvshows/stromberg/Mobbing--/815/',
  'tt0428167:1:4': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Geburtstag--/865/',
  'tt0428167:1:5': 'https://www.myspass.de/shows/tvshows/stromberg/Die-gute-Tat--/864/',
  'tt0428167:1:6': 'https://www.myspass.de/shows/tvshows/stromberg/Diebstahl--/863/',
  'tt0428167:1:7': 'https://www.myspass.de/shows/tvshows/stromberg/Die-Befoerderung--/862/',
  'tt0428167:1:8': 'https://www.myspass.de/shows/tvshows/stromberg/Der-letzte-Tag--/665/',
  'tt0428167:2:1': 'https://www.myspass.de/shows/tvshows/stromberg/Herr-Becker--/664/',
  'tt0428167:2:2': 'https://www.myspass.de/shows/tvshows/stromberg/Bowling--/861/',
  'tt0428167:2:3': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Kurs--/860/',
  'tt0428167:2:4': 'https://www.myspass.de/shows/tvshows/stromberg/Badminton--/736/',
  'tt0428167:2:5': 'https://www.myspass.de/shows/tvshows/stromberg/Maennerfreundschaften--/859/',
  'tt0428167:2:6': 'https://www.myspass.de/shows/tvshows/stromberg/Theo--/737/',
  'tt0428167:2:7': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Vertrag--/807/',
  'tt0428167:2:8': 'https://www.myspass.de/shows/tvshows/stromberg/Die-Putzfrau--/858/',
  'tt0428167:2:9': 'https://www.myspass.de/shows/tvshows/stromberg/Die-Kuendigung--/857/',
  'tt0428167:2:10': 'https://www.myspass.de/shows/tvshows/stromberg/Tag-der-offenen-Tuer--/856/',
  'tt0428167:3:1': 'https://www.myspass.de/shows/tvshows/stromberg/Jennifer--/738/',
  'tt0428167:3:2': 'https://www.myspass.de/shows/tvshows/stromberg/Nicole--/816/',
  'tt0428167:3:3': 'https://www.myspass.de/shows/tvshows/stromberg/Karneval--/817/',
  'tt0428167:3:4': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Protest--/818/',
  'tt0428167:3:5': 'https://www.myspass.de/shows/tvshows/stromberg/Jochen--/819/',
  'tt0428167:3:6': 'https://www.myspass.de/shows/tvshows/stromberg/Lulu--/820/',
  'tt0428167:3:7': 'https://www.myspass.de/shows/tvshows/stromberg/Herr-Loermann--/822/',
  'tt0428167:3:8': 'https://www.myspass.de/shows/tvshows/stromberg/Erika--/821/',
  'tt0428167:4:1': 'https://www.myspass.de/shows/tvshows/stromberg/Beziehungen--/1149/',
  'tt0428167:4:2': 'https://www.myspass.de/shows/tvshows/stromberg/Finsdorf--/1150/',
  'tt0428167:4:3': 'https://www.myspass.de/shows/tvshows/stromberg/Seelsorge--/1210/',
  'tt0428167:4:4': 'https://www.myspass.de/shows/tvshows/stromberg/Helge--/1211/',
  'tt0428167:4:5': 'https://www.myspass.de/shows/tvshows/stromberg/Paerchenabend--/1227/',
  'tt0428167:4:6': 'https://www.myspass.de/shows/tvshows/stromberg/Sally--/1249/',
  'tt0428167:4:7': 'https://www.myspass.de/shows/tvshows/stromberg/Gernot--/1311/',
  'tt0428167:4:8': 'https://www.myspass.de/shows/tvshows/stromberg/Die-Rueckkehr--/1358/',
  'tt0428167:4:9': 'https://www.myspass.de/shows/tvshows/stromberg/Herr-Nehring--/1362/',
  'tt0428167:4:10': 'https://www.myspass.de/shows/tvshows/stromberg/Die-Abrechnung--/1384/',
  'tt0428167:5:1': 'https://www.myspass.de/shows/tvshows/stromberg/Malik--/6372/',
  'tt0428167:5:2': 'https://www.myspass.de/shows/tvshows/stromberg/Frau-Papenacker--/6375/',
  'tt0428167:5:3': 'https://www.myspass.de/shows/tvshows/stromberg/Frau-Wilhelmi--/6376/',
  'tt0428167:5:4': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Nachfolger--/6377/',
  'tt0428167:5:5': 'https://www.myspass.de/shows/tvshows/stromberg/Die-Konferenz--/6378/',
  'tt0428167:5:6': 'https://www.myspass.de/shows/tvshows/stromberg/Herr-Ruether--/6379/',
  'tt0428167:5:7': 'https://www.myspass.de/shows/tvshows/stromberg/Cheyenne--/6380/',
  'tt0428167:5:8': 'https://www.myspass.de/shows/tvshows/stromberg/Jonas--/6381/',
  'tt0428167:5:9': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Rodach-Bonus--/6382/',
  'tt0428167:5:10': 'https://www.myspass.de/shows/tvshows/stromberg/Der-Abschied--/6383/'
}

export const getStreamUrl = async (id) => {
  const pageUrl = idToPageMapping[id]

  const browser = await playwright.launch({
    args: chromium.args,
    executablePath: await chromium.executablePath(process.env.CHROMIUM_PACK_URL),
    headless: chromium.headless
  })
  const context = await browser.newContext();
  const page = await context.newPage()
  await page.goto(pageUrl)
  const url = await page.locator('video').getAttribute('src')
  const title = (await page.locator('h2.title').first().innerText()).split('\n')[0]
  await browser.close()
  return {
    url,
    title,
    name: 'MySpass Addon'
  }
}
