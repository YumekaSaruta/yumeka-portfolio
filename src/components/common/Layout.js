import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import { Navigation } from '.'

// Styles
import '../../styles/app.css'

/**
* Main layout component
*
* The Layout component wraps around each page and template.
* It also provides the header, footer as well as the main
* styles, and meta data for each page.
*
*/

const DefaultLayout = ({ data, children, bodyClass, isHome }) => {
    const site = data.allGhostSettings.edges[0].node
    // const twitterUrl = site.twitter ? `https://twitter.com/${site.twitter.replace(/^@/, ``)}` : null
    // const facebookUrl = site.facebook ? `https://www.facebook.com/${site.facebook.replace(/^\//, ``)}` : null
    console.log(children[0])

    return (
        <>
            <Helmet>
                <html lang={site.lang} />
                <style type="text/css">{`${site.codeinjection_styles}`}</style>
                <body className={bodyClass} />
            </Helmet>

            <div className="viewport">

                <div className="viewport-top">
                    {/* The main header section on top of the screen */}
                    <header className="site-head">
                        <div className="container">
                            <div className="site-mast">
                                <div className="site-mast-left">
                                    {/* サイトアイコンをここで設定している */}
                                    <Link to="/">
                                        {site.logo ?
                                            <img className="site-logo" src={site.logo} alt={site.title} />
                                            : <Img fixed={data.file.childImageSharp.fixed} alt={site.title} />
                                        }
                                    </Link>
                                </div>
                                {/* SNS系のリンクをここで表示している */}
                                <div className="site-mast-right">{/* The navigation items as setup in Ghost */}
                                    {/* TODO: 必要なリンクのみに修正する。
                                              MENU: WORKS, ABOUT CONTACT
                                                WORKS: ブログ記事一覧
                                                ABOUT: ゆめかちゃんの紹介ページ
                                                CONTACT: ゆめかちゃんへのお問い合わせページ

                                     */}
                                    <Navigation data={site.navigation} navClass="site-nav-item" />
                                    {/* { site.twitter && <a href={ twitterUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/twitter.svg" alt="Twitter" /></a>}
                                    { site.facebook && <a href={ facebookUrl } className="site-nav-item" target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/facebook.svg" alt="Facebook" /></a>}
                                    <a className="site-nav-item" href={ `https://feedly.com/i/subscription/feed/${config.siteUrl}/rss/` } target="_blank" rel="noopener noreferrer"><img className="site-nav-icon" src="/images/icons/rss.svg" alt="RSS Feed" /></a> */}
                                </div>
                            </div>
                            { isHome ?
                                <div className="site-banner">
                                    <h1 className="site-banner-title">
                                        <small className="site-banner-title-name-alphabet">Yumeka Saruta</small>
                                        <p>サルタ ユメカ</p>
                                    </h1>
                                    <p className="site-banner-desc"></p>
                                </div> :
                                null}
                        </div>
                    </header>
                    <main className="site-main" id="works">
                        {/* All the main content gets inserted here, index.js, post.js */}
                        {children}
                    </main>

                </div>

                <div className="viewport-bottom">
                    <div className="site-foot-container">
                        <div>
                            <hr className="site-foot-line"></hr>
                        </div>
                        <div className="site-foot-contact">
                            <a href="/contact/">声を掛ける</a>
                        </div>
                    </div>
                    {/* The footer at the very bottom of the screen */}
                    <footer className="site-foot">
                        <div className="site-foot-nav container">
                            <div className="site-foot-nav-left">
                                <Link to="/">Yumeka Saruta</Link> © 2021
                            </div>
                            <div className="site-foot-nav-right">
                                <Navigation data={site.navigation} navClass="site-foot-nav-item" />
                            </div>
                        </div>
                    </footer>

                </div>
            </div>

        </>
    )
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
    bodyClass: PropTypes.string,
    isHome: PropTypes.bool,
    data: PropTypes.shape({
        file: PropTypes.object,
        allGhostSettings: PropTypes.object.isRequired,
    }).isRequired,
}

const DefaultLayoutSettingsQuery = props => (
    <StaticQuery
        query={graphql`
            query GhostSettings {
                allGhostSettings {
                    edges {
                        node {
                            ...GhostSettingsFields
                        }
                    }
                }
                file(relativePath: {eq: "ghost-icon.png"}) {
                    childImageSharp {
                        fixed(width: 30, height: 30) {
                            ...GatsbyImageSharpFixed
                        }
                    }
                }
            }
        `}
        render={data => <DefaultLayout data={data} {...props} />}
    />
)

export default DefaultLayoutSettingsQuery
