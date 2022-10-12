const UtilsController = {

  GetDate: () => {
    var date = new Date();
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  },

  GenerateLogName: (folder: string) => {
    return folder + '/project-controller-' + UtilsController.GetDate();
  },

}

export default UtilsController;