const express = require("express");
const router = express.Router();
const models = require("../models");
const {
  SUCCESS: SUC_CODE,
  CLIENT_ERROR: CE_CODE,
  SERVER_ERROR: SE_CODE,
} = require("../constants/statusCodes");
const { REGISTER: E_MESSAGES } = require("../constants/errorMessages");

// 문의 등록
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, status } = req.body;
    await models.Contact.create({ name, email, phone, message, status });
    res.status(SUC_CODE.CREATED).json({ message: "문의가 등록되었습니다." });
  } catch (error) {
    res.status(SE_CODE.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
  }
});

// 문의 전체 조회
router.get("/", async (req, res) => {
  try {
    const contacts = await models.Contact.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.json(contacts);
  } catch (error) {
    res.status(SE_CODE.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
  }
});

// 문의 상세 조회
router.get("/:id", async (req, res) => {
  try {
    const contact = await models.Contact.findByPk(req.params.id);
    if (!contact) {
      return res
        .status(CE_CODE.NOT_FOUND)
        .json({ message: "문의가 없습니다." });
    }
    res.json(contact);
  } catch (error) {
    res.status(SE_CODE.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
  }
});

// 문의 상태 수정
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await models.Contact.findByPk(req.params.id);
    if (!contact) {
      return res
        .status(CE_CODE.NOT_FOUND)
        .json({ message: "문의가 없습니다." });
    }
    contact.status = status;
    await contact.save();
    res.json({ message: "문의 상태가 수정되었습니다.", contact });
  } catch (error) {
    res.status(SE_CODE.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
  }
});

// 문의 삭제
router.delete("/:id", async (req, res) => {
  try {
    const contact = await models.Contact.findByPk(req.params.id);
    if (!contact) {
      return res
        .status(CE_CODE.NOT_FOUND)
        .json({ message: "문의가 없습니다." });
    }
    await contact.destroy();
    res.json({ message: "문의가 삭제되었습니다." });
  } catch (error) {
    res.status(SE_CODE.INTERNAL_SERVER_ERROR).json({ message: "서버 오류" });
  }
});

module.exports = router;
