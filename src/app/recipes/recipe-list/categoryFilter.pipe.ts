import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'categoryFilter'
})
export class CategoryFilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string) {
    if(filterString === '') return value

    const resultArray = []
    for(const item of value){
      if(item[propName] === filterString){
        resultArray.push(item)
      }
    }
    return resultArray
  }  
}