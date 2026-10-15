import s from '@/components/careways/careways.module.css'
import Experience from '@/components/careways/Experience'
import { Footer, Header, RoyalCircle, Trust } from '@/components/careways/Sections'

export default function CarewaysDemoPage() {
  return (
    <div className={s.root}>
      <Header />
      <main>
        <Experience />
        <Trust />
        <RoyalCircle />
      </main>
      <Footer />
    </div>
  )
}
