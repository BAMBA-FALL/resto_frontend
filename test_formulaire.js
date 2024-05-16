// ProductAdd.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SketchPicker } from 'react-color';
import { productService } from '../../../_services/product.service';
import './productadd.css';

const ProductAdd = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: 0,
    type: '',
    category: '',
    stock: 0,
    color: '', 
    colors: [],
    storageCapacity: [],
    images: []
});

  const [selectedImages, setSelectedImages] = useState([]);
  const [colorInput, setColorInput] = useState('');
  const navigate = useNavigate();

  const handleAddProduct = async () => {
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('type', productData.type);
      formData.append('category', productData.category);
      formData.append('stock', productData.stock);
      formData.append('color', productData.color);
      formData.append('colors', JSON.stringify(productData.colors));
      formData.append('storageCapacity', JSON.stringify(productData.storageCapacity));
      
      selectedImages.forEach((image, index) => {
        formData.append(`images`, image);
      });
  
      await productService.addProduct(
        '/api/products',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
  
      console.log('Produit ajouté avec succès');
      navigate('/admin');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du produit', error);
    }
  };

  const handleImageChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    const limitedFiles = selectedFiles.slice(0, 4);
  
    setSelectedImages(limitedFiles);
  };

  const handleColorChange = (color) => {
    setProductData({ ...productData, colors: [...productData.colors, color.hex] });
    setColorInput('');
  };

  const handleColorRemove = (colorToRemove) => {
    const updatedColors = productData.colors.filter(color => color !== colorToRemove);
    setProductData({ ...productData, colors: updatedColors });
  };

  return (
    <div className='container-2'>
      <h2>Ajouter un produit</h2>
      <form>
        <div className="form-group-2">
          <label className="form-label-2">Titre:</label>
          <input
            type="text"
            className="form-input-2"
            value={productData.title}
            onChange={(e) => setProductData({ ...productData, title: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Description:</label>
          <textarea
            className="form-textarea-2"
            value={productData.description}
            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Prix:</label>
          <input
            type="number"
            className="form-input-2"
            value={productData.price}
            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Type:</label>
          <input
            type="text"
            className="form-input-2"
            value={productData.type}
            onChange={(e) => setProductData({ ...productData, type: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Catégorie:</label>
          <input
            type="text"
            className="form-input-2"
            value={productData.category}
            onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          />
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Stock:</label>
          <input
            type="number"
            className="form-input-2"
            value={productData.stock}
            onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
          />
        </div>

        <div className="form-group-2">
  <label className="form-label-2">Couleur de l'appareil:</label>
  <input
    type="text"
    className="form-input-2"
    value={productData.color}
    onChange={(e) => setProductData({ ...productData, color: e.target.value })}
  />
</div>


        <div className="form-group-2">
          <label className="form-label-2">Couleurs:</label>
          <SketchPicker
            color={colorInput}
            onChangeComplete={(color) => setColorInput(color.hex)}
          />
          <button
            type="button"
            onClick={() => handleColorChange({ hex: colorInput })}
            className="add-color-button"
          >
            Ajouter la couleur
          </button>
          {productData.colors.map((color, index) => (
            <div key={index} className="selected-color">
              <div style={{ backgroundColor: color }} className="color-box"></div>
              <span>{color}</span>
              <button
                type="button"
                onClick={() => handleColorRemove(color)}
                className="remove-color-button"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Capacité de stockage (en GB):</label>
          <select
            className="form-select-2"
            multiple
            value={productData.storageCapacity}
            onChange={(e) => setProductData({ ...productData, storageCapacity: Array.from(e.target.selectedOptions, (option) => option.value) })}
          >
            <option value="64">64</option>
            <option value="128">128</option>
            <option value="256">256</option>
            <option value="512">512</option>
            <option value="1024">1024</option>
          </select>
        </div>

        <div className="form-group-2">
          <label className="form-label-2">Images:</label>
          <input
            type="file"
            className="form-file-2"
            onChange={handleImageChange}
            multiple
          />
          <div className="image-preview">
            {selectedImages.map((image, index) => (
              <img
                key={index}
                src={URL.createObjectURL(image)}
                alt={`Image ${index + 1}`}
                className="preview-image"
              />
            ))}
          </div>
        </div>

        <button type="button" className="form-button-2" onClick={handleAddProduct}>
          Ajouter le produit
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;



import React, { useState, useEffect } from 'react';
import { productService } from '../../../_services/product.service';
import { accessoryService } from '../../../_services/accessoire.service';
import './addAccessoire.css'
const AddAccessoryForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    category: '',
    productId: '',
    image: '',
  });

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [productSearchTerm, setProductSearchTerm] = useState('');
  const [productSearchResults, setProductSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await productService.getProducts();
        setProducts(productsData.products); 
      } catch (error) {
        setError('Erreur lors de la récupération des produits');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, products]);

  const handleProductSearch = (event) => {
    setProductSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = products.filter(product =>
      product.title.toLowerCase().includes(productSearchTerm.toLowerCase())
    );
    setProductSearchResults(results);
  }, [productSearchTerm, products]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newAccessory = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        stock: formData.stock,
        category: formData.category,
        productId: selectedProductId,
        image: formData.image, // Utilisation des objets de fichiers
      };
      const addedAccessory = await accessoryService.addAccessory(newAccessory);
      console.log('Accessory added:', addedAccessory);
      // Réinitialiser le formulaire après l'ajout
      setFormData({
        title: '',
        description: '',
        price: 0,
        stock: 0,
        category: '',
        productId: '',
        image: '', // Réinitialisation des images
      });
    } catch (error) {
      console.error('Error adding accessory:', error);
      // Gérer les erreurs ici
    }
  };

  const MAX_IMAGES = 4;

  const handleImageChange = (e) => {
    const selectedImages = e.target.files;
    if (selectedImages.length > MAX_IMAGES) {
      alert(`Vous ne pouvez sélectionner que ${MAX_IMAGES} images.`);
      e.target.value = null;
    } else {
      const newImages = [...formData.images, ...Array.from(selectedImages)];
      const limitedImages = newImages.slice(0, MAX_IMAGES);
      setFormData({ ...formData, images: limitedImages });
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="productSearch">Recherche de produit :</label>
        <input type="text" id="productSearch" name="productSearch" value={productSearchTerm} onChange={handleProductSearch} />
      </div>
      <div className="form-group">
        <label htmlFor="selectedProduct">Produit associé :</label>
        <select id="selectedProduct" name="selectedProduct" value={selectedProductId} onChange={(e) => setSelectedProductId(e.target.value)}>
          <option value="">Sélectionnez un produit</option>
          {productSearchResults.map(product => (
            <option key={product._id} value={product._id}>{product.title}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="title">Titre :</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description :</label>
        <textarea id="description" name="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="price">Prix :</label>
        <input type="number" id="price" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="stock">Stock :</label>
        <input type="number" id="stock" name="stock" value={formData.stock} onChange={(e) => setFormData({ ...formData, stock: e.target.value })} />
      </div>
      <div className="form-group">
        <label htmlFor="category">Catégorie :</label>
        <input type="text" id="category" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
      </div>
      <div className="form-group">
    <label htmlFor="image">Image :</label>
    <input type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
  </div>

  {/* Affichage de l'image sélectionnée */}
  <div className="form-group">
    {formData.image && (
      <img src={URL.createObjectURL(formData.image)} alt="Selected Image" style={{ maxWidth: '100px', maxHeight: '100px', marginRight: '10px' }} />
    )}
  </div>

      <button type="submit">Ajouter l'accessoire</button>
    </form>
  );
};

export default AddAccessoryForm;


import React, { useEffect, useState } from "react";
import { carouselService } from '../../_services/carousel.service';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CarouselProduct = () => {
    const [carousels, setCarousels] = useState([]);

    useEffect(() => {
        const fetchCarousels = async () => {
            try {
                const data = await carouselService.getCarousel();
                console.log(data.carousels)
                setCarousels(data.carousels);
            } catch (error) {
                console.error('Erreur lors de la récupération des carousels :', error);
            }
        };

        fetchCarousels();
    }, []);

    const SampleNextArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", background: "grey", justifyContent:"center", alignItems:"center" }} onClick={onClick} />
        );
    }

    const SamplePrevArrow = (props) => {
        const { className, style, onClick } = props;
        return (
            <div className={className} style={{ ...style, display: "flex", background: "grey", justifyContent:"center", alignItems:"center" }} onClick={onClick} />
        );
    }

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        speed: 4000,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        nextArrow: <SampleNextArrow/>,
        prevArrow: <SamplePrevArrow />
    };

    return (
        <div >
            {carousels.map(carousel => (
                <div key={carousel._id}>
                    <Slider {...settings}>
                        {carousel.images.map(image => (
                            <div key={image}>
                                <img src={`http://localhost:4000/uploads/${image}`} alt={carousel.title} style={{width:"100%", height:"100%"}} />
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>
    );
};

export default CarouselProduct;

