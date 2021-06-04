import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(value: string, filterString: string, propName: string) {
    if(filterString === '') return value

    const resultArray = []
    for(const item of value){
      if(item[propName].includes(filterString)){
        resultArray.push(item)
      }
    }
    return resultArray
  }  
}