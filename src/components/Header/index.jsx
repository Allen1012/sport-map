import React from 'react';
import { Link } from 'gatsby';
import { AVATAR, NAVS } from 'src/utils/const';
import Img from "gatsby-image"

export const query = graphql `
  query {
    file(relativePath: { eq: "head_icon.jpg" }) {
      childImageSharp {
        # Specify the image processing specifications right in the query.
        # Makes it trivial to update as your page's design changes.
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`

const Header = ({ siteTitle }) => {
  if (!AVATAR && !NAVS) return null;
  return (
    <>
      <nav
        className="db flex justify-between w-100 ph5-l"
        style={{ marginTop: '3rem' }}
      >
        {AVATAR && (
          <div className="dib w-25 v-mid">
            <Link to="/" className="link dim">
              <picture>
                <img
                  className="dib w3 h3 br-100"
                  alt={siteTitle || 'avatar'}
                  src={AVATAR}
                />
              </picture>
            </Link>
          </div>
        )}
          <h1>haah</h1>
          {/*<Img fixed={siteTitle.file.childImageSharp.fixed} />*/}
        {NAVS && (
          <div className="dib w-75 v-mid tr">
            {NAVS.map((n, i) => (
              <a
                key={i}
                href={n.link}
                className="light-gray link dim f6 f5-l mr3 mr4-l"
              >
                {n.text}
              </a>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;


