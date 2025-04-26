import './card.css'

interface CardProps{
  name: string
  email: string
  company: string
}

const Card=(props: CardProps)=>{
    return(
        <div className="card">
          <h3>{props.name}</h3>
          <p>{props.email}</p>
          <span>{props.company}</span>
        </div>
    )
}

export default Card