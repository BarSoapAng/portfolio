import gif from '@assets/email-me.gif'

export default function EmailMeCard() {
  return(
    <a href='mailto:soapangzhou@gmail.com' target='_top'>
      <img src={gif} />
    </a>
  )
}