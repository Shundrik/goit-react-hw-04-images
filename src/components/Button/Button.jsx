import "../../Style/styles.css"


export const Button = ({onLoadMore}) => {
    return(
        <button className = "Button" onClick={onLoadMore}>Load more</button>
    )
}