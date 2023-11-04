import { readFileSync, writeFileSync } from 'node:fs';
import { json2xml } from 'xml-js';

import { cterm, element, term } from './xml.js';

function load() {
  const json = JSON.parse(readFileSync('./animes.json').toString());

  return json;
}

const STATUS = {
  planned: 'Plan to Watch',
  watching: 'Watching',
  completed: 'Completed',
  dropped: 'Dropped',
  on_hold: 'On-Hold',
};

function mapAnime(anime) {
  return element('anime', [
    term('series_animedb_id', anime.target_id),
    cterm('series_title', anime.target_title),
    term('series_type', 'TV'),
    term('series_episodes', ''),
    term('my_id', 0),
    term('my_watched_episodes', anime.episodes),
    term('my_start_date', '0000-00-00'),
    term('my_finish_date', '0000-00-00'),
    term('my_rated', ''),
    term('my_score', anime.score),
    term('my_storage', ''),
    term('my_storage_value', '0.00'),
    term('my_status', STATUS[anime.status]),
    cterm('my_comments', anime.text ?? ''),
    term('my_times_watched', anime.rewatches ?? 0),
    term('my_rewatch_value', ''),
    term('my_priority', 'LOW'),
    cterm('my_tags', ''),
    term('my_rewatching', '0'),
    term('my_rewatching_ep', '0'),
    term('my_discuss', '1'),
    term('my_sns', 'default'),
    term('update_on_import', '0'),
  ]);
}

function mapAnimes(animes) {
  const xmljson = {
    declaration: {
      attributes: {
        version: '1.0',
        encoding: 'UTF-8',
      },
    },
    elements: [
      {
        type: 'element',
        name: 'myanimelist',
        elements: [
          { type: 'element', name: 'myinfo' },
          ...animes.map(mapAnime),
        ],
      },
    ],
  };

  return xmljson;
}

function save(xml) {
  writeFileSync('animes.xml', xml);
}

const animes = load();
const xmljson = mapAnimes(animes);
const xml = json2xml(xmljson, { compact: false });
save(xml);
