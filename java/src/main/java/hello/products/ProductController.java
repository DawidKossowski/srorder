package hello.products;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class ProductController {
	@Autowired // This means to get the bean called userRepository
	           // Which is auto-generated by Spring, we will use it to handle the data
	private ProductRepository productRepository;
	private static final Logger LOG = LoggerFactory.getLogger(ProductController.class);
	
	@GetMapping(path="/addProduct") // Map ONLY GET Requests
	public @ResponseBody String addNewProduct (@RequestParam String name
			, @RequestParam Double price, @RequestParam Integer amount) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request

		Product p = productRepository.findProductByName(name);
		if(p != null) {
			Integer oldAmount = p.getAmount();
			oldAmount += amount;
			p.setAmount(oldAmount);
			productRepository.save(p);
			return "Updated";
		}
		else {
			Product n = new Product();
			n.setName(name);
			n.setPrice(price);
			n.setAmount(amount);
			productRepository.save(n);
			return "Saved";
		}
	}
	
	@GetMapping(path="/allProducts")
	public @ResponseBody Iterable<Product> getAllProducts() {
		// This returns a JSON or XML with the users
		return productRepository.findAll();
	}

	@GetMapping(path = "/findProductById")
	public @ResponseBody Product findProductById(Integer productId) {
		return productRepository.findProductByIntegerId(productId);
	}
}
