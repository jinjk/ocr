import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fieldFilter'
})
export class FieldFilterPipe implements PipeTransform {

  transform(keys: any[], tableElements: any): any {
    return keys.filter(key => {
      let item = tableElements[key];
      let fieldData = item.fieldData;
      if(fieldData == null || fieldData.container == null || fieldData.title == null || fieldData.text == null || fieldData.text.item == null) {
        return false;
      }
      else {
        return true;
      }
     
    }).map(key => tableElements[key].fieldData);
  }

}
