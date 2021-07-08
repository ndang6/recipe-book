import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(value: string, filterString: string, propName: string) {
    // value = recipes
    if(filterString === '' || filterString.length < 3) return value

    const resultArray = []

    for(const item of value){
      if(item[propName].toLowerCase().includes(filterString.toLowerCase()))
        resultArray.push(item)
    }
    
    return resultArray
  }  
}