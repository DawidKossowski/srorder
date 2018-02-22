package hello.Cart;

import hello.User.UserController;
import hello.orders.OrdersController;
import hello.products.ProductController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping(path="/api")
public class CartController {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserController userController;

    @Autowired
    private ProductController productController;

    private static final Logger LOG = LoggerFactory.getLogger(OrdersController.class);

    @GetMapping(path = "/createCart")
    public @ResponseBody
    UserCart createCart(@RequestParam Integer userId) {
        UserCart userCart = new UserCart();
        userCart.user = this.userController.getUserById(userId);
        this.cartRepository.save(userCart);
        return userCart;
    }

    @GetMapping(path = "/getCart")
    public @ResponseBody
    UserCart getCartByUserId(@RequestParam Integer userId) {

        for (UserCart usercart : this.cartRepository.findAll()
                ) {
            if (usercart.user.getId() == userId) {
                return usercart;
            }
        }
        return null;
    }

    @RequestMapping(path ="/saveCartAtOnce")
    public @ResponseBody String save(@RequestBody WholeCartView cartToSave) {
        if(getCartByUserId(cartToSave.userId)==null) {
            UserCart userCart = new UserCart();
            userCart.user = this.userController.getUserById(cartToSave.userId);
            this.cartRepository.save(userCart);
            LOG.info("new cart created");
        }
        boolean isAlreadyInCart = false;
        Integer updated = 0;
        Integer added = 0;
        Integer removed = 0;

            for (Integer i = 0; i < cartToSave.productsIds.size(); i++) {

                for (CartItem cartitem : getItemsInCartByCartId( this.getCartByUserId(cartToSave.userId).id)) {
                    if (cartitem.product.getId() == cartToSave.productsIds.get(i)) { //if already exists in cart
                        isAlreadyInCart = true;
                        if(cartitem.amount != cartToSave.amounts.get(i) ) { //update
                            updated ++;
                            cartitem.amount = cartToSave.amounts.get(i);
                            this.cartItemRepository.save(cartitem);
                        }
                    }
                }
                if(!isAlreadyInCart) { //create new if doesnt exists in cart
                    CartItem cartItem = new CartItem();
                    cartItem.cart = getCartByUserId(cartToSave.userId);
                    cartItem.product = this.productController.findProductById(cartToSave.productsIds.get(i));
                    cartItem.amount = cartToSave.amounts.get(i);
                    this.cartItemRepository.save(cartItem);
                    added++;
                }
        }
        boolean stillInCart;
        for ( CartItem cartItemInDB: getItemsInCartByCartId( this.getCartByUserId(cartToSave.userId).id) ) {
            stillInCart = false;
            for ( Integer x: cartToSave.productsIds ) { //check if anything is removed from cart
                if( cartItemInDB.product.getId() == x )
                    stillInCart = true;
            }
            if( !stillInCart ) {
                removed++;
                this.cartItemRepository.delete(cartItemInDB);
                break;
            }
        }


        LOG.info(updated + " products updated, " +added + " products added, " + removed + " products removed");

        return "Cart saved";
    }


    @GetMapping(path = "/findItemInCart")
    public @ResponseBody
    List<CartItem> getItemsInCartByCartId(@RequestParam Integer cartId) {
        List<CartItem> result = new ArrayList<>();
        for (CartItem cartItem: cartItemRepository.findAll()
             ) {
            if(cartItem.cart.id == cartId) {
                result.add(cartItem);
            }
        }
        return result;
    }


}
