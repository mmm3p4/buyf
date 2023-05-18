import { useParams } from "react-router-dom"
import AuthService from "../services/Auth.service"
import { useEffect } from "react"

const Empty = () => {
    const {id} = useParams()
  useEffect(() => {
    AuthService.loginVK(id).then((response) =>
    {console.log(response)
    window.location.href ='/'
    })
  }, [id])
    return(
        <p>олпдсжчваелрп</p>
    )
}
export default Empty;