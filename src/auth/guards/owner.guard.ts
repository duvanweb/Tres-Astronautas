import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { ProductService } from '../../products/services/product.service';
@Injectable()
export class OwnerGuard implements CanActivate {
  constructor(private productService: ProductService) { }

  /**
   * Metodo para validar si el producto existe y si le pertenece al usuario
   * @param context
   */
  async canActivate(
    context: ExecutionContext,
  ){
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const product = await this.productService.findOne(request.params.id);
    if(!product){
      throw new BadRequestException(`The product with id ${request.params.id} not exist`);
    }

    if(product.user !== user.id ){
      throw new UnauthorizedException('The user is not authorized for this product.');
    }
    return true;
  }
}
