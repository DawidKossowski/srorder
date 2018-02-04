package hello;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hello.Product;
import hello.ProductRepository;

@Controller    // This means that this class is a Controller
@RequestMapping(path="/api") // This means URL's start with /demo (after Application path)
public class MainController {
	@Autowired // This means to get the bean called userRepository
	           // Which is auto-generated by Spring, we will use it to handle the data
	private ProductRepository productRepository;
	
	@GetMapping(path="/addProduct") // Map ONLY GET Requests
	public @ResponseBody String addNewProduct (@RequestParam String name
			, @RequestParam Double price) {
		// @ResponseBody means the returned String is the response, not a view name
		// @RequestParam means it is a parameter from the GET or POST request
		
		Product n = new Product();
		n.setName(name);
		n.setPrice(price);
		productRepository.save(n);
		return "Saved";
	}
	
	@GetMapping(path="/allProducts")
	public @ResponseBody Iterable<Product> getAllProducts() {
		// This returns a JSON or XML with the users
		return productRepository.findAll();
	}
}
