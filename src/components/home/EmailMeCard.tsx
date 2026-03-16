import gif from '@assets/email-me.gif'

export default function EmailMeCard() {
  return(
    <a href='mailto:soapangzhou@gmail.com' target='_top' className="block h-full w-full">
      <img src={gif.src} alt="Email me" className="h-full w-full object-cover" />
    </a>
  )
}
