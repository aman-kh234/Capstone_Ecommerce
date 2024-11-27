package com.ecommerce.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ecommerce.Exception.ProductException;
import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.model.Seller;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import com.ecommerce.response.CreateProductRequest;
import com.ecommerce.service.ProductService;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService{
	
	@Autowired
	private final ProductRepository productRepository;
	
	@Autowired
	private final CategoryRepository categoryRepository;
	
	@Override
	public Product createProduct(CreateProductRequest req, Seller seller) {
		Category category1 = categoryRepository.findByCategoryId(req.getCategory());
		if(category1==null) {
			Category category = new Category();
			category.setCategoryId(req.getCategory());
			category.setLevel(1);
			category1=categoryRepository.save(category);
		}
		
		Category category2 = categoryRepository.findByCategoryId(req.getCategory2());
		if(category2==null) {
			Category category = new Category();
			category.setCategoryId(req.getCategory2());
			category.setLevel(2);
			category.setParentCategory(category1);
			category1=categoryRepository.save(category);
		}
		
		Category category3 = categoryRepository.findByCategoryId(req.getCategory3());
		if(category3==null) {
			Category category = new Category();
			category.setCategoryId(req.getCategory3());
			category.setLevel(3);
			category.setParentCategory(category2);
			category1=categoryRepository.save(category);
		}
		
		int discountPercentage = calculateDiscountPercentage(req.getMrpPrice(),req.getSellingPrice());
		Product product = new Product();
		product.setSeller(seller);
		product.setCategory(category3);
		product.setDescription(req.getDescription());
		product.setCreatedAt(LocalDateTime.now());
		product.setTitle(req.getTitle());
		product.setColor(req.getColor());
		product.setSellingPrice(req.getSellingPrice());
		product.setImages(req.getImages());
		product.setMrpPrice(req.getMrpPrice());
		product.setSizes(req.getSizes());
		product.setDiscountPercent(discountPercentage);
		return productRepository.save(product);
	}

	@Override
	public void deleteProduct(Long productId) {
		Product product = productRepository.findProductById(productId);
		productRepository.delete(product);
	}

	@Override
	public Product updateProduct(Long productId, Product product) throws ProductException {
		//if productid not exist
		findProductById(productId);
//		productRepository.findProductById(productId);
		//if exists then change the product
		product.setId(productId);
		return productRepository.save(product);
	}

	@Override
	public Product findProductById(Long productId) throws ProductException {
		return productRepository.findById(productId).orElseThrow(()->new ProductException("product not found with id "+productId));
	}

	@Override
	public List<Product> searchProducts(String query) {
		
		return productRepository.searchProducts(query);
	}

	@Override
	public Page<Product> getAllProducts(String category, String brand, String colors, String sizes, Integer minPrice,Integer minDiscount,
			Integer maxPrice, String sort, String stock, Integer pageNumber) {
		
		// using specification for data jpa filtering
		Specification<Product> spec = (root,query,criteriaBuilder)->{
			List<Predicate>predicates = new ArrayList<>();
			if(category!=null) {
				Join<Product,Category> categoryJoin = root.join("category");
				predicates.add(criteriaBuilder.equal(categoryJoin.get("categoryId"), category));
			}
			
			if (category != null && !category.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("category"), category));
            }
            if (brand != null && !brand.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("brand"), brand));
            }
            if (colors != null && !colors.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("color"), colors));
            }
            if (sizes != null && !sizes.isEmpty()) {
                predicates.add(criteriaBuilder.equal(root.get("size"), sizes));
            }
            if (minPrice != null) {
                predicates.add(criteriaBuilder.greaterThanOrEqualTo(root.get("sellingPrice"), minPrice));
            }
            if (maxPrice != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("sellingPrice"), maxPrice));
            }
            if (minDiscount != null) {
                predicates.add(criteriaBuilder.lessThanOrEqualTo(root.get("discountPercentage"), maxPrice));
            }
            if (stock != null && stock.equalsIgnoreCase("inStock")) {
                predicates.add(criteriaBuilder.equal(root.get("stock"), stock));
            }
            
            // Combine predicates
            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
       
		};
		
		Pageable pageable;
		
		if(sort!=null && !sort.isEmpty()) {
        	switch(sort) {
        	case "price_low" :
        		pageable = PageRequest.of(pageNumber!=null?pageNumber:0,10,Sort.by("sellingPrice").ascending()); 
        		break;
        	
        	case "price_high" :
        		pageable = PageRequest.of(pageNumber!=null?pageNumber:0,10,Sort.by("sellingPrice").descending()); 
        		break;
        	default:
        		pageable = PageRequest.of(pageNumber!=null?pageNumber:0,10,Sort.unsorted()); 	
        	};
        }
        else {
        	pageable = PageRequest.of(pageNumber!=null?pageNumber:0,10,Sort.unsorted());
        }
		
		return productRepository.findAll(spec,pageable);
	}

	@Override
	public List<Product> getProductBySellerId(Long sellerId) {
		return productRepository.findBySellerId(sellerId);
	}
	
	private int calculateDiscountPercentage(int mrpPrice, int sellingPrice) {
		if(mrpPrice<=0) {
			throw new IllegalArgumentException("Actual Price must be > 0 ");
		}
		return ((mrpPrice-sellingPrice)/mrpPrice)*100;
	}
}
