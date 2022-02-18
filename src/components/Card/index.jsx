import './card.css'

const Card = (props)=>{
    return (
        <div className={`card ${props.color}`}>
            <div className='infosCard'>
                <span className="title">{props.title}</span>
                <span>R${props.value}</span>
            </div>
            <div className="icon">
                {props.children}
            </div>
            
        </div>
    )
}

export default Card