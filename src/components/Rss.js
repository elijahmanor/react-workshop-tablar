import React, { useState, useEffect } from "react";
import Parser from "rss-parser";
/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { distanceInWords } from "date-fns";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const parser = new Parser();

export function Rss({ url }) {
  const [feed, setFeed] = useState(null);
  useEffect(() => {
    async function fetchData() {
      let feed = await parser.parseURL(`${CORS_PROXY}${url}`);
      setFeed(feed);
    }
    fetchData();
  }, []);
  return feed ? (
    <div>
      <h1
        css={css`
          margin-top: 0;
        `}
      >
        <a
          css={css`
            text-decoration: none;
            font-size: 2rem;
            color: black;
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
          `}
          href={feed.link}
        >
          {feed.title}
        </a>
      </h1>
      <ul
        css={css`
          list-style-type: none;
        `}
      >
        {feed.items.map(item => (
          <li
            css={css`
              margin-bottom: 1rem;
            `}
            key={item.id}
          >
            <a
              css={css`
                text-decoration: none;
                font-weight: normal;
                font-size: 1rem;
                width: 100%;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                display: inline-block;
                color: black;
                &:hover {
                  text-decoration: underline;
                }
              `}
              href={item.link}
            >
              {item.title}
            </a>
            <div>
              <span
                css={css`
                  color: #666;
                  font-size: 0.75rem;
                `}
              >
                by {item.author}
              </span>{" "}
              <time
                css={css`
                  color: #666;
                  font-size: 0.75rem;
                `}
              >
                {distanceInWords(new Date(item.pubDate), new Date())} ago
              </time>
            </div>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="Rss-loading">
      <svg width="2rem" height="2rem" viewBox="0 0 24 24">
        <path d="M23 12c0 1.042-.154 2.045-.425 3h-2.101c.335-.94.526-1.947.526-3 0-4.962-4.037-9-9-9-1.706 0-3.296.484-4.655 1.314l1.858 2.686h-6.994l2.152-7 1.849 2.673c1.684-1.049 3.659-1.673 5.79-1.673 6.074 0 11 4.925 11 11zm-6.354 7.692c-1.357.826-2.944 1.308-4.646 1.308-4.962 0-9-4.038-9-9 0-1.053.191-2.06.525-3h-2.1c-.271.955-.425 1.958-.425 3 0 6.075 4.925 11 11 11 2.127 0 4.099-.621 5.78-1.667l1.853 2.667 2.152-6.989h-6.994l1.855 2.681z" />
      </svg>
    </div>
  );
}