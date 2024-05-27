import {Injectable} from "@angular/core";

@Injectable()
export class VocabularyService {
  getPosts(): any[] {
    return [
      {id: 0, name: 'Доктор'},
      {id: 1, name: 'Не Доктор'},
      {id: 2, name: 'Докторенок'},
      {id: 3, name: 'Акушер'}
    ]
  }

  getTypesInteraction(): any[] {
    return [
      {id: 0, name: 'Автоматический'},
      {id: 1, name: 'Полуавтоматический'},
      {id: 2, name: 'Ручной'},
      {id: 3, name: 'Двусторонний обмен'}
    ]
  }

  getTypeEquipments(): any[] {
    return [
      {id: 0, name: 'Тип 1'},
      {id: 1, name: 'Тип 2'},
      {id: 2, name: 'Тип 3'},
      {id: 3, name: 'Тип 4'}
    ]
  }

  getRiskCategories(): any[] {
    return [
      {value: 1, text: 'Беременность(1-й триместр)'},
      {value: 2, text: 'Беременность(2-й триместр)'},
      {value: 3, text: 'Беременность(3-й триместр)'},
      {value: 4, text: 'Курение'},
      {value: 5, text: 'Алкоголизм'},
      {value: 6, text: 'Наркомания'},
    ]
  }

  // выбранные категории риска для указания для них
  // допустимых референсных значений
  getReferences(): any[] {
    return [
      {value: 1, text: 'Беременность(1-й триместр) c алкоголизмом'},
      {value: 2, text: 'Беременность(2-й триместр) с наркоманией'},
      {value: 3, text: 'Беременность(3-й триместр) без вредных привычек'},
      // {value: 4, text: 'Курение'},
      // {value: 5, text: 'Алкоголизм'},
      // {value: 6, text: 'Наркомания'},
    ]
  }

  getTests(): any[] {
    return [
      {value: 1, text: 'Тест на кровь для Беременность(1-й триместр) c алкоголизмом'},
      {value: 2, text: 'Тест на диабет для Беременность(2-й триместр) с наркоманией'},
      {value: 3, text: 'Тест на ВИЧ для Беременность(3-й триместр) без вредных привычек'},
      // {value: 4, text: 'Курение'},
      // {value: 5, text: 'Алкоголизм'},
      // {value: 6, text: 'Наркомания'},
    ]
  }

  getPatients(): any[] {
    return [
      {value: 1, text: 'Иванов'},
      {value: 2, text: 'Петров'},
      {value: 3, text: 'Сидоров'},
      // {value: 4, text: 'Курение'},
      // {value: 5, text: 'Алкоголизм'},
      // {value: 6, text: 'Наркомания'},
    ]
  }
}
