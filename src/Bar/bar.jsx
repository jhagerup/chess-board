import './bar.css'

export default function Bar(params) {
    return (
        <div className={"bar " + params.className}
        style={{
            backgroundColor: params.color
        }}>

        </div>
    )
}