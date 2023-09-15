import { BrowserRouter, Route, Routes as ReactRoutes } from "react-router-dom"
import { Garagem, Caixa, Palindromo, Home, Cep } from "./pages"

export const Routes = () => {
return (
    <BrowserRouter>
        <ReactRoutes>
            <Route path="/" element={<Home/>}/>
            <Route path="/palindromos" element={<Palindromo/>}/>
            <Route path="/caixa" element={<Caixa/>}/>
            <Route path="/garagem" element={<Garagem/>}/>
            <Route path="/cep" element={<Cep/>}/>
        </ReactRoutes>
    </BrowserRouter>
)
}