// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SketchPicker } from 'react-color';
// import { productService } from '../../../_services/product.service';
// import './productadd.css';

// const ProductAdd = () => {
//   const [productData, setProductData] = useState({
//     title: '',
//     description: '',
//     price: 0,
//     type: '',
//     categorie: '',
//     stock: 0,
//     color: '', 
//     colors: [],
//     storageCapacity: [],
//     images: []
// });

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [colorInput, setColorInput] = useState('');
//   const navigate = useNavigate();

//   const handleAddProduct = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', productData.title);
//       formData.append('description', productData.description);
//       formData.append('price', productData.price);
//       formData.append('type', productData.type);
//       formData.append('categorie', productData.categorie);
//       formData.append('stock', productData.stock);
//       formData.append('color', productData.color);
//       productData.colors.forEach(color => formData.append('colors', color)); // Ajoutez chaque couleur au FormData
//       productData.storageCapacity.forEach(capacity => formData.append('storageCapacity', capacity)); // Ajoutez chaque capacité au FormData


      
//       selectedImages.forEach((image, index) => {
//         formData.append(`images`, image);
//       });
  
//       await productService.addProduct(
//         '/api/products',
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
  
//       console.log('Produit ajouté avec succès');
//       navigate('/admin');
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du produit', error);
//     }
//   };

//   const handleImageChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     const limitedFiles = selectedFiles.slice(0, 4);
  
//     setSelectedImages(limitedFiles);
//   };

//   const handleColorChange = (color) => {
//     setProductData(prevState => ({
//         ...prevState,
//         colors: [...prevState.colors, color.hex]
//     }));
//     setColorInput('');
// };


//   const handleColorRemove = (colorToRemove) => {
//     const updatedColors = productData.colors.filter(color => color !== colorToRemove);
//     setProductData({ ...productData, colors: updatedColors });
//   };

//   return (
//     <div className='container-2'>
//       <h2>Ajouter un produit</h2>
//       <form>
//         <div className="form-group-2">
//           <label className="form-label-2">Titre:</label>
//           <input
//             type="text"
//             className="form-input-2"
//             value={productData.title}
//             onChange={(e) => setProductData({ ...productData, title: e.target.value })}
//           />
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Description:</label>
//           <textarea
//             className="form-textarea-2"
//             value={productData.description}
//             onChange={(e) => setProductData({ ...productData, description: e.target.value })}
//           />
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Prix:</label>
//           <input
//             type="number"
//             className="form-input-2"
//             value={productData.price}
//             onChange={(e) => setProductData({ ...productData, price: e.target.value })}
//           />
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Type:</label>
//           <input
//             type="text"
//             className="form-input-2"
//             value={productData.type}
//             onChange={(e) => setProductData({ ...productData, type: e.target.value })}
//           />
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Catégorie:</label>
//           <input
//             type="text"
//             className="form-input-2"
//             value={productData.categorie}
//             onChange={(e) => setProductData({ ...productData, categorie: e.target.value })}
//           />
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Stock:</label>
//           <input
//             type="number"
//             className="form-input-2"
//             value={productData.stock}
//             onChange={(e) => setProductData({ ...productData, stock: e.target.value })}
//           />
//         </div>

//         <div className="form-group-2">
//   <label className="form-label-2">Couleur de l'appareil:</label>
//   <input
//     type="text"
//     className="form-input-2"
//     value={productData.color}
//     onChange={(e) => setProductData({ ...productData, color: e.target.value })}
//   />
// </div>


//         <div className="form-group-2">
//           <label className="form-label-2">Couleurs:</label>
//           <SketchPicker
//             color={colorInput}
//             onChangeComplete={(color) => setColorInput(color.hex)}
//           />
//           <button
//             type="button"
//             onClick={() => handleColorChange({ hex: colorInput })}
//             className="add-color-button"
//           >
//             Ajouter la couleur
//           </button>
//           {productData.colors.map((color, index) => (
//             <div key={index} className="selected-color">
//               <div style={{ backgroundColor: color }} className="color-box"></div>
//               <span>{color}</span>
//               <button
//                 type="button"
//                 onClick={() => handleColorRemove(color)}
//                 className="remove-color-button"
//               >
//                 Supprimer
//               </button>
//             </div>
//           ))}
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Capacité de stockage (en GB):</label>
//           <select
//             className="form-select-2"
//             multiple
//             value={productData.storageCapacity}
//             onChange={(e) => setProductData({ ...productData, storageCapacity: Array.from(e.target.selectedOptions, (option) => option.value) })}
//           >
//             <option value="64">64</option>
//             <option value="128">128</option>
//             <option value="256">256</option>
//             <option value="512">512</option>
//             <option value="1024">1024</option>
//           </select>
//         </div>

//         <div className="form-group-2">
//           <label className="form-label-2">Images:</label>
//           <input
//             type="file"
//             className="form-file-2"
//             onChange={handleImageChange}
//             multiple
//           />
//           <div className="image-preview">
//             {selectedImages.map((image, index) => (
//               <img
//                 key={index}
//                 src={URL.createObjectURL(image)}
//                 alt={`Image ${index + 1}`}
//                 className="preview-image"
//               />
//             ))}
//           </div>
//         </div>

//         <button type="button" className="form-button-2" onClick={handleAddProduct}>
//           Ajouter le produit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductAdd;

// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { SketchPicker } from 'react-color';
// import { productService } from '../../../_services/product.service';
// import './productadd.css';

// const ProductAdd = () => {
//   const [productData, setProductData] = useState({
//     title: '',
//     description: '',
//     categorie: '',
//     variants: [], // Structure des variantes
//   });

//   const [selectedImages, setSelectedImages] = useState([]);
//   const [variantInput, setVariantInput] = useState({
//     colors: '',
//     storageCapacity: '',
//     etats: '',
//     price: '',
//     stock: '',
//   });

//   const navigate = useNavigate();

//   const handleAddProduct = async () => {
//     try {
//       const formData = new FormData();
//       formData.append('title', productData.title);
//       formData.append('description', productData.description);
//       formData.append('categorie', productData.categorie);

//       // Ajout des variantes au FormData
//       productData.variants.forEach((variant, index) => {
//         formData.append(`variants[${index}][colors]`, variant.colors.join(','));
//         formData.append(`variants[${index}][storageCapacity]`, variant.storageCapacity.join(','));
//         formData.append(`variants[${index}][etats]`, variant.etats.join(','));
//         formData.append(`variants[${index}][price]`, variant.price);
//         formData.append(`variants[${index}][stock]`, variant.stock);
//       });

//       // Gestion des images
//       selectedImages.forEach((image, index) => {
//         formData.append(`images`, image);
//       });

//       await productService.addProduct('/api/products', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log('Produit ajouté avec succès');
//       navigate('/admin'); // Redirection après ajout du produit
//     } catch (error) {
//       console.error('Erreur lors de l\'ajout du produit', error);
//     }
//   };

//   const handleImageChange = (event) => {
//     const selectedFiles = Array.from(event.target.files);
//     const limitedFiles = selectedFiles.slice(0, 4); // Limite à 4 images
//     setSelectedImages(limitedFiles);
//   };

//   const handleVariantChange = (field, value) => {
//     setVariantInput((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const addVariant = () => {
//     const newVariant = {
//       colors: variantInput.colors.split(',').map((c) => c.trim()),
//       storageCapacity: variantInput.storageCapacity.split(',').map((c) => c.trim()),
//       etats: variantInput.etats.split(',').map((e) => e.trim()),
//       price: parseFloat(variantInput.price),
//       stock: parseInt(variantInput.stock),
//     };

//     setProductData((prev) => ({
//       ...prev,
//       variants: [...prev.variants, newVariant],
//     }));

//     console.log('Variants:', productData.variants); // Pour débuguer et vérifier les variantes ajoutées

//     // Réinitialisation du formulaire de variantes
//     setVariantInput({
//       colors: '',
//       storageCapacity: '',
//       etats: '',
//       price: '',
//       stock: '',
//     });
//   };

//   return (
//     <div className='container-2'>
//       <h2>Ajouter un produit</h2>
//       <form>
//         {/* Titre du produit */}
//         <div className="form-group-2">
//           <label className="form-label-2">Titre:</label>
//           <input
//             type="text"
//             className="form-input-2"
//             value={productData.title}
//             onChange={(e) => setProductData({ ...productData, title: e.target.value })}
//           />
//         </div>

//         {/* Description du produit */}
//         <div className="form-group-2">
//           <label className="form-label-2">Description:</label>
//           <textarea
//             className="form-textarea-2"
//             value={productData.description}
//             onChange={(e) => setProductData({ ...productData, description: e.target.value })}
//           />
//         </div>

//         {/* Catégorie du produit */}
//         <div className="form-group-2">
//           <label className="form-label-2">Catégorie:</label>
//           <input
//             type="text"
//             className="form-input-2"
//             value={productData.categorie}
//             onChange={(e) => setProductData({ ...productData, categorie: e.target.value })}
//           />
//         </div>

//         {/* Variantes */}
//         <div className="form-group-2">
//           <label className="form-label-2">Variantes:</label>
//           <input
//             type="text"
//             placeholder="Couleurs (séparées par des virgules)"
//             value={variantInput.colors}
//             onChange={(e) => handleVariantChange('colors', e.target.value)}
//           />
//           <input
//             type="text"
//             placeholder="Capacité de stockage (séparées par des virgules)"
//             value={variantInput.storageCapacity}
//             onChange={(e) => handleVariantChange('storageCapacity', e.target.value)}
//           />

//           <input
//             type="text"
//             placeholder="États (séparées par des virgules)"
//             value={variantInput.etats}
//             onChange={(e) => handleVariantChange('etats', e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Prix"
//             value={variantInput.price}
//             onChange={(e) => handleVariantChange('price', e.target.value)}
//           />
//           <input
//             type="number"
//             placeholder="Stock"
//             value={variantInput.stock}
//             onChange={(e) => handleVariantChange('stock', e.target.value)}
//           />

//           {/* Bouton pour ajouter une variante */}
//           <button type="button" onClick={addVariant}>
//             Ajouter une variante
//           </button>
          
//           {/* Affichage des variantes ajoutées */}
//           <div className="variants-display">
//             {productData.variants.map((variant, index) => (
//               <div key={index}>
//                 <p>Couleurs : {variant.colors.join(', ')}</p>
//                 <p>Stockage : {variant.storageCapacity.join(', ')}</p>
//                 <p>États : {variant.etats.join(', ')}</p>
//                 <p>Prix : {variant.price}</p>
//                 <p>Stock : {variant.stock}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Gestion des images */}
//         <div className="form-group-2">
//           <label className="form-label-2">Images:</label>
//           <input
//             type="file"
//             onChange={handleImageChange}
//             multiple
//           />
//           {/* Affichage des images sélectionnées */}
//           <div className="image-preview">
//             {selectedImages.map((image, index) => (
//               <img
//                 key={index}
//                 src={URL.createObjectURL(image)}
//                 alt={`Image ${index + 1}`}
//                 className="preview-image"
//               />
//             ))}
//           </div>
//         </div>

//         {/* Bouton pour ajouter le produit */}
//         <button type="button" className="form-button-2" onClick={handleAddProduct}>
//           Ajouter le produit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ProductAdd;

import React, { useState, useEffect } from 'react';
import { categoryService } from '../../../_services/category.service';
import { productService } from '../../../_services/product.service';

const AddProductForm = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    stock: 0,
    color: '',
    colors: '', // En tant que chaîne de texte, les couleurs peuvent être séparées par des virgules
    storageCapacity: '',
    images: [],
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAllCategoriesWithSubcategories();
        setCategories(response);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: files });

    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut

    try {
      const productData = new FormData(); // Utilisation de FormData pour les fichiers et les champs texte
      productData.append('title', formData.title);
      productData.append('description', formData.description);
      productData.append('price', formData.price);
      productData.append('stock', formData.stock);
      productData.append('color', formData.color);
      productData.append('colors', formData.colors); // Gérer les couleurs séparées par des virgules
      productData.append('category', selectedCategory); // Assigner la catégorie sélectionnée
      
      formData.images.forEach((file) => productData.append('images', file));

      await productService.addProduct(productData);
      console.log('Produit ajouté avec succès.');
    } catch (error) {
      console.error("Erreur lors de l'ajout du produit:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Titre:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="price">Prix:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="stock">Stock:</label>
        <input
          type="number"
          id="stock"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="color">Couleur principale:</label>
        <input
          type="text"
          id="color"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="colors">Autres couleurs (séparées par des virgules):</label>
        <input
          type="text"
          id="colors"
          name="colors"
          value={formData.colors}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="storageCapacity">Capacité de stockage (séparée par des virgules):</label>
        <input
          type="text"
          id="storageCapacity"
          name="storageCapacity"
          value={formData.storageCapacity}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <label>Catégorie:</label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          required
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((category) => (
            <React.Fragment key={category._id}>
              <option value={category._id}>{category.name}</option>
              {category.subcategories.map((subcategory) => (
                <option key={subcategory._id} value={subcategory._id}>
                  - {subcategory.name}
                </option>
              ))}
            </React.Fragment>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="images">Images (jusqu'à 4):</label>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <div className="image-previews">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Prévisualisation de l'image ${index + 1}`}
              style={{ maxWidth: '100px', maxHeight: '100px' }}
            />
          ))}
        </div>
      </div>

      <button type="submit">Ajouter le produit</button>
    </form>
  );
};

export default AddProductForm;
