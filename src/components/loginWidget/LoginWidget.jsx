import { Link } from 'react-router-dom'

export const LoginWidget = () => {
    return (
        <Link to='/login' className=" btn btn-outline-light">
            <span> Mi cuenta</span>
        </Link>
    )
}