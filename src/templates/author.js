import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import { Layout, PostCard, Pagination } from '../components/common'
import { MetaData } from '../components/common/meta'

/**
* Author page (/author/:slug)
*
* Loads all posts for the requested author incl. pagination.
*
*/
const Author = ({ data, location, pageContext }) => {
    const author = data.ghostAuthor
    const posts = data.allGhostPost.edges

    return (
        <>
            <MetaData
                data={data}
                location={location}
                type="profile"
            />
            <Layout>
                <div className="author-header-image">
                    {/* <img src="../images/author-top.jpg" alt={author.name} /> */}
                    {/* {author.profile_image && <img src="../images/ghost-icon.png" alt={author.name} />} */}
                    {author.profile_image && <img src={author.profile_image} alt={author.name} />}
                </div>
                <div className="container">
                    <header className="author-header">
                        <div className="author-header-content">
                            {/* <h1>{author.name}</h1> */}
                            <p className="author-name-kana">サルタ ユメカ</p>
                            <h1 className="author-name">YUMEKA SARUTA</h1>
                            <div className="author-jobs"><span>｜</span>WEB DESIGNER</div>
                            {/* {author.bio && <p>{author.bio}</p>} */}
                            <div className="author-details">
                                <div>
                                    <p>1994年、静岡県浜松市生まれ。</p>
                                    <p>20歳で上京後ブライダルに勤務。</p>
                                    <p>2019年WEBデザインスクール</p>
                                    <p>に通い、株式会社Bug.sへ入社。</p>
                                    <p>WEBデザインなどを担当後</p>
                                    <p>2021年にフリーランスのWEBデザイナー</p>
                                    <p>として独立。</p>
                                </div>
                                <div>
                                    <p>今後は、お客様に寄り添いつつ</p>
                                    <p>ポジティブな提案のできるWEBデザイナー</p>
                                    <p>として、精進していきたいと思って</p>
                                    <p>おります。</p>
                                </div>
                                <div>
                                    <p>ぜひ、お気軽にお声かけ下さい。</p>
                                </div>
                                {/* MEMO: SNSリンクをここで修正する */}
                                {/* <div className="author-header-meta">
                                    {author.website && <a className="author-header-item" href={author.website} target="_blank" rel="noopener noreferrer">Website</a>}
                                    {twitterUrl && <a className="author-header-item" href={twitterUrl} target="_blank" rel="noopener noreferrer">Twitter</a>}
                                    {facebookUrl && <a className="author-header-item" href={facebookUrl} target="_blank" rel="noopener noreferrer">Facebook</a>}
                                </div> */}
                            </div> 
                        </div>
                        {/* <div className="author-header-image">
                            {author.profile_image && <img src={author.profile_image} alt={author.name} />}
                        </div> */}
                    </header>
                    {/* <section className="post-feed">
                        {posts.map(({ node }) => (
                            // The tag below includes the markup for each post - components/common/PostCard.js
                            <PostCard key={node.id} post={node} />
                        ))}
                    </section> */}
                    <Pagination pageContext={pageContext} />
                </div>
            </Layout>
        </>
    )
}

Author.propTypes = {
    data: PropTypes.shape({
        ghostAuthor: PropTypes.shape({
            name: PropTypes.string.isRequired,
            cover_image: PropTypes.string,
            profile_image: PropTypes.string,
            website: PropTypes.string,
            bio: PropTypes.string,
            location: PropTypes.string,
            facebook: PropTypes.string,
            twitter: PropTypes.string,
        }),
        allGhostPost: PropTypes.object.isRequired,
    }).isRequired,
    location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
    }).isRequired,
    pageContext: PropTypes.object,
}

export default Author

export const pageQuery = graphql`
    query GhostAuthorQuery($slug: String!, $limit: Int!, $skip: Int!) {
        ghostAuthor(slug: { eq: $slug }) {
            ...GhostAuthorFields
        }
        allGhostPost(
            sort: { order: DESC, fields: [published_at] },
            filter: {authors: {elemMatch: {slug: {eq: $slug}}}},
            limit: $limit,
            skip: $skip
        ) {
            edges {
                node {
                ...GhostPostFields
                }
            }
        }
    }
`
