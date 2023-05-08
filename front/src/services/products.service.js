import { useHttp } from "../hooks/http.hook";

const ProductsService = () => {
const {request} = useHttp()

    const fetchdata = async (id) => {
        // const data = await fetch (`http://localhost:8081/products/${id}`)
        // const dataJson = await data.json();
      
        // return dataJson.rows
        return request(`http://localhost:8081/products/${id}`)
      }

      return {fetchdata}
}

export default ProductsService;