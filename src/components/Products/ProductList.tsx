import React, {useEffect, useState} from "react";
import {search} from "./Products";
import {Product} from "./types";

const ProductList = () => {
    const [title, setTitle] = useState<string>("Search for products")
    const [query, setQuery] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);

    let expanded = false

    let options = [{name: "stary", id: 1}, {name: "leży", id: 2}, {name: "najebany", id: 3}]

    let selectedOptions = {}

    useEffect(() => {
        if (query !== "") {
            search(query).then(response => {
                if (response.status !== 200) {
                    setTitle("Search engine errored")
                    return;
                }
                setTitle("Search for products");
                setProducts(response.data.data)
            })
        }
    }, [query]);

    const showCheckboxes = () => {
        const checkboxes = document.getElementById("checkboxes");
        if (!expanded) {
            checkboxes!.style.display = "block";
            expanded = true;
        } else {
            checkboxes!.style.display = "none";
            expanded = false;
        }
    }


    return (
        <div className="container md:col-span-3 flex flex-col">
            <h1>{title}</h1>
            <input className="w-1/2" placeholder="Enter product name" value={query}
                   onChange={(e) => setQuery(e.target.value)}/>
            {
                products.map((product, index) => (
                    <div key={index}>
                        {index} : {product.name} - {product.description}
                    </div>
                ))
            }
        </div>
    );
};

export default ProductList