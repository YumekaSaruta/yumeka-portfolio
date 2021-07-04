import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/common/layout'

const ContactPage = () => (
  <Layout>
    <div className="contact-form-yumeka">
        <h1 className="contact-title-yumeka">Contact</h1>
        <form 
          name="contact" 
          method="POST" 
          data-netlify="true"
          data-netlify-honeypot="bot-field"
        >
        <input type="hidden" name="form-name" value="contact" />
        <input type="hidden" name="bot-field" />

          <div className="form-group">
            {/* <label>お名前<abbr title="required">*</abbr> */}
            <input type="text" className="form-control" id="name" name="name" placeholder="お名前" maxLength="30" minLength="2" required />
            {/* </label> */}
          </div>
          <div className="form-group">
            {/* <label>メールアドレス<abbr title="required">*</abbr> */}
            <input type="email" className="form-control" id="email" name="email" placeholder="メールアドレス" pattern="^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" required autocomplete="email" />
            {/* </label> */}
          </div>
          <div className="form-group">
            {/* <label>お問い合わせ内容<abbr title="required">*</abbr> */}
            <textarea className="form-control" id="contact" name="content" rows="8" required></textarea>
            {/* </label> */}
          </div>

          <div className="form-group contact-submit-btn">
          <button type="submit">送信</button>
          </div>
        </form>
    </div>
  </Layout>
)

export default ContactPage