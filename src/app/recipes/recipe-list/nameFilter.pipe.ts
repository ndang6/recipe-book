import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'nameFilter'
})
export class NameFilterPipe implements PipeTransform {
  transform(value: string, filterString: string, propName: string) {
    if(filterString === '' || filterString.length < 3) return value

    const resultArray = []
    for(const item of value){
      let lowercaseName = item[propName].toLowerCase()
      if(lowercaseName.includes(filterString.toLowerCase())){
        resultArray.push(item)
      }
    }
    return resultArray
  }  
}